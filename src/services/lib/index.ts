import {type NextRequest} from 'next/server';
import {isValidObjectId, type Model, type HydratedDocument} from 'mongoose';
import {Md5} from 'ts-md5';
import slug from 'slug';
import {genSalt, hash, compare} from 'bcrypt';
import {getP8n} from '@/lib/helpers';
import type {GeoLocation, P8n} from '@/types';
import {getLocationFromIp} from '@/lib/geo';
import {type Request} from 'request-ip';

// Define interfaces for common types
export interface DocWithNameAndSlug {
  name?: string;
  slug?: string;
  title?: string;
  password?: string;
  // [x: string]: any;
}

export interface Location {
  longitude: number;
  latitude: number;
}

export const getModelQuery = (
  prop: string,
  {
    slugProp = 'slug',
    numberProp = 'id',
  }: {slugProp?: string; numberProp?: string} = {}
) => {
  const isObjectId = isValidObjectId(prop);
  const isNumber = /^\d+$/.test(prop);
  return {
    [isObjectId ? '_id' : isNumber ? numberProp : slugProp]: isObjectId
      ? prop
      : isNumber
      ? +prop
      : {$regex: `^${prop}`, $options: 'i'},
  };
};

export const getDomain = (email: string): string => {
  return email.split('@')[1];
};

export const getGravatar = (email: string): string => {
  const gravatarHash: string = Md5.hashStr(email.trim().toLowerCase());
  return `https://www.gravatar.com/avatar/${gravatarHash}?s=150&d=retro`;
};

export const preSaveDoc = async <T extends DocWithNameAndSlug>(
  doc: HydratedDocument<any & T>,
  {
    nameProp = 'name',
    saltRounds = 12,
  }: {
    nameProp?: string;
    saltRounds?: number;
  } = {}
) => {
  console.log(`saving ${doc?.[nameProp] ?? doc?.title ?? doc._id}...`);
  if (doc.isModified(nameProp) && doc.slug) {
    const newSlug = slug(doc[nameProp]);
    const slugRegex = new RegExp(`^${doc.slug}((-\\d*$)?)$`, 'i');
    try {
      const count = await (doc.constructor as Model<T>).countDocuments({
        slug: slugRegex,
      });
      doc.slug = count ? `${newSlug}-${count + 1}` : newSlug;
    } catch (err) {
      if (!(err instanceof Error)) return;
      console.error(err);
    }
  }

  if (doc.isModified('password')) {
    try {
      const salt = await genSalt(saltRounds);
      doc.password = await hash(doc.password, salt);
    } catch (err) {
      if (!(err instanceof Error)) return;
      console.error(err);
    }
  }
};

export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  try {
    const match: boolean = await compare(password, hash);
    return match;
  } catch (err) {
    if (!(err instanceof Error)) return false;
    console.error(err);
    return false;
  }
};

export const getFieldList = async <T>(
  Model: Model<T>,
  field: keyof T & string
) => {
  return await Model.aggregate([
    {$unwind: `$${field}`},
    {$group: {_id: `$${field}`, count: {$sum: 1}}},
    {$sort: {count: -1, _id: 1}},
  ]);
};

export const getTopRated = async <T>(
  Model: Model<T>,
  {
    page,
    limit,
    foreignField,
    collection = 'reviews',
    addedField = 'averageRating',
  }: {
    page?: number | string | null;
    limit?: number | string | null;
    foreignField: string;
    collection?: string;
    addedField?: string;
  }
): Promise<{docs: Array<T & {[key: string]: number}>; p8n: P8n}> => {
  const pipeline = [
    {
      $lookup: {
        from: collection,
        localField: '_id',
        foreignField,
        as: collection,
      },
    },
    {
      $match: {
        [`${collection}.1`]: {$exists: true},
      },
    },
  ];
  try {
    const [{count}] = (await Model.aggregate(pipeline).count(
      'count'
    )) as Array<{
      count: number;
    }>;

    const p8n = getP8n(count, page, limit);

    const docs = await Model.aggregate(pipeline)
      .addFields({
        [addedField]: {
          $avg: `$${collection}.rating`,
        },
      })
      .sort(`-${addedField}`)
      .skip(p8n.skip)
      .limit(p8n.limit);
    return {docs, p8n};
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getNearby = async (
  Model: Model<any>,
  req: NextRequest & Request
): Promise<{
  status: string;
  message: string;
  code: number;
  data: {
    userLocation: GeoLocation | undefined;
    stores: any[];
  };
}> => {
  const {
    nextUrl: {searchParams},
  } = req;
  const lng = searchParams.get('lng');
  const lat = searchParams.get('lat');
  // const page = searchParams.get('p');
  const maxDistance = searchParams.get('max-distance');
  const limit = searchParams.get('limit');
  try {
    const loc = await getLocationFromIp(req);
    const longitude = !lng || lng === 'undefined' ? loc?.longitude ?? 0 : +lng;
    const latitude = !lat || lat === 'undefined' ? loc?.latitude ?? 0 : +lat;
    const query = {
      location: {
        $near: {
          $maxDistance: +(maxDistance ?? 0) || 10000,
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
        },
      },
    };
    // const count = await Model.countDocuments(query);
    // const p8n = getP8n(count, page, limit);
    // console.log(p8n);
    const docs = await Model.find(query).limit(limit ? +limit : 10);
    return {
      status: 'success',
      message: `Fetched nearby ${Model.modelName}.`,
      code: 200,
      // ...p8n,
      data: {userLocation: loc, stores: docs},
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getBookQuery = (bookParam: string) => {
  const isObjectId = isValidObjectId(bookParam);
  const isNumber = /^\d+$/.test(bookParam);
  return {
    [isObjectId ? '_id' : isNumber ? 'bookId' : 'slug']: isObjectId
      ? bookParam
      : isNumber
      ? +bookParam
      : {$regex: `^${bookParam}`, $options: 'i'},
  };
};

export const getAuthorQuery = (authorId: string) => {
  const isObjectId = isValidObjectId(authorId);
  return {
    [isObjectId ? '_id' : 'authorId']: isObjectId ? authorId : +authorId,
  };
};

export const getTranslatorQuery = (translatorId: string) => {
  const isObjectId = isValidObjectId(translatorId);
  return {
    [isObjectId ? '_id' : 'translatorId']: isObjectId
      ? translatorId
      : +translatorId,
  };
};

export const getSegmentQuery = (segmentParam: string) => {
  const isObjectId = isValidObjectId(segmentParam);
  return {
    [isObjectId ? '_id' : 'order']: isObjectId ? segmentParam : +segmentParam,
  };
};

export const incrementId = async (
  Model: Model<any>,
  {prop = 'order'}: {prop?: string} = {}
) => {
  const count = await Model.countDocuments();
  const maxSegment = await Model.findOne().sort(`-${prop}`);
  return Math.max(count, Number(maxSegment?.[prop]) ?? 0) + 1;
};

export const updateIds = async ({
  Model,
  minId = 1,
  prop,
}: {
  Model: Model<any>;
  minId?: number;
  prop?: string;
}) => {
  const modelName = Model.modelName.toLowerCase();
  const query = {[prop ?? `${modelName}Id`]: {$gte: minId}};
  try {
    for await (const doc of Model.find(query)) {
      await Model.updateOne(
        {_id: doc._id},
        {
          [prop ?? `${modelName}Id`]: minId,
        }
      );
      minId++;
    }
  } catch (err) {
    throw err;
  }
};
