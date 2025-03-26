import Store from './store.model';
import User, {type IUser} from '../user';
import Review, {type IReview} from '../review';
import {processUploadFile} from '@/lib/files/file.middleware';
import {getModelQuery} from '@/services/lib';
import {getP8n} from '@/lib/helpers';
import type {IStore, IStoreWithReviews, StoreModel} from './store.types';
import {type HydratedDocument} from 'mongoose';
import {NextRequest} from 'next/server';

export const createStore = async (
  body: FormData,
  userId: string
): Promise<any> => {
  const data = Object.fromEntries(body);
  const {name, description, address, lat, lng} = data;
  const tags = body.getAll('tags');
  try {
    const file = await processUploadFile(body, {
      field: 'photo',
      folder: 'next-stores',
    });

    const store = new Store({
      name,
      description,
      tags,
      location: {
        type: 'Point',
        coordinates: [+lng, +lat],
        address,
      },
      ...(file && {
        photo: {
          key: file?.fileName,
          title: file?.title,
          ext: file?.ext,
          mimeType: file?.mimetype,
          size: file?.size,
          readableSize: file?.readableSize,
        },
      }),
      author: userId,
    });
    if (!store) {
      const err = new Error('Something went wrong!');
      throw err;
    }
    const doc = (await store.save()) as HydratedDocument<IStore> & {
      _doc: IStore;
    };
    return {
      data: doc._doc,
      status: 'success',
      message: `Successfully created ${doc.name}.`,
      code: 201,
    };
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err);
    throw err;
  }
};

export const findStoresWithReviews = async (
  Model: StoreModel,
  {
    page,
    limit,
    query,
    extraPipeline = [],
  }: {
    page: number;
    limit: number;
    query: any;
    extraPipeline?: Array<any>;
  }
): Promise<any> => {
  const pipeline = [
    {
      $match: query || {},
    },
    ...extraPipeline,
    {
      $lookup: {
        from: 'reviews',
        localField: '_id',
        foreignField: 'store',
        as: 'reviews',
      },
    },
  ];
  try {
    const [{count}] = (await Model.aggregate(pipeline).count('count')) as {
      count: number;
    }[];
    const p8n = getP8n(count, page, limit);
    const docs = (await Model.aggregate(pipeline)
      .sort('-reviews -updatedAt')
      .skip(p8n.skip)
      .limit(p8n.limit)) as Array<IStoreWithReviews>;
    if (!docs) {
      const err = new Error('Something went wrong!');
      throw err;
    }
    return {
      status: 'success',
      code: 200,
      message: `Successfully fetched docs!`,
      ...p8n,
      data: docs,
    };
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err);
    return {stores: null, p8n: null};
  }
};

export const getStore = async (
  storeParam: string
): Promise<{
  status: string;
  message: string;
  code: number;
  data?: any;
}> => {
  const storeQuery = getModelQuery(storeParam);
  try {
    const store = (await Store.findOne(storeQuery)) as IStore & {
      _doc: IStore;
    };
    if (!store) {
      return {
        status: 'error',
        message: `No store found with id or slug ${storeParam}`,
        code: 404,
      };
    }
    let reviews = (await Review.find({store: store._id}).sort({
      updatedAt: -1,
    })) as Array<HydratedDocument<IReview>>;
    reviews = await Promise.all(
      reviews.map(async (r) => {
        let user = (await User.findById(
          r.author,
          '-password -resetPasswordToken -resetPasswordExpires -__v'
        )) as
          | any
          | (HydratedDocument<IUser> & {
              _doc: IUser;
            });
        user = {
          ...user._doc,
          gravatar: await user.gravatar,
        };
        return {
          // @ts-ignore
          ...r._doc,
          author: user,
        };
      })
    );
    return {
      status: 'success',
      code: 200,
      message: `Successfully fetched store!`,
      data: {
        ...store._doc,
        reviews,
      },
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const updateStore = async (req: NextRequest, storeParam: string) => {
  const userId = req.headers.get('X-USER-ID');
  const storeQuery = getModelQuery(storeParam);
  try {
    const store = (await Store.findOne(storeQuery)) as IStore;
    if (store.author.toString() !== userId) {
      return {
        status: 'error',
        message: 'You are not the author of this store!',
        code: 400,
      };
    }
    const body = await req.formData();
    const data = Object.fromEntries(body);
    const {name, description, address, lat, lng} = data;
    const tags = body.getAll('tags');

    const file =
      body.get('photo') &&
      (await processUploadFile(body, {field: 'photo', folder: 'next-stores'}));

    const update = {
      name,
      description,
      tags,
      location: {
        type: 'Point',
        coordinates: [+lng, +lat],
        address,
      },
      ...(file && {
        photo: {
          key: file?.fileName,
          title: file?.title,
          ext: file?.ext,
          mimeType: file?.mimetype,
          size: file?.size,
          readableSize: file?.readableSize,
        },
      }),
    };

    const res = (await Store.findOneAndUpdate(storeQuery, update, {
      new: true,
      runValidators: true,
    })) as HydratedDocument<IStore> & {_doc: HydratedDocument<IStore>};

    if (!res) {
      return {
        status: 'error',
        message: 'Something went wrong',
        code: 500,
      };
    }
    return {
      status: 'success',
      code: 201,
      message: `Successfully updated ${res.name}!`,
      data: res._doc,
    };
  } catch (err) {
    console.error(err);
    return {
      status: 'error',
      message: (err as Error).message,
      code: 500,
    };
  }
};

export const deleteAllStores = async (): Promise<any> => {
  try {
    const res = await Store.deleteMany({});
    if (!res) {
      const err = new Error('Something went wrong!');
      throw err;
    }
    return {
      status: 'success',
      message: `Successfully deleted all stores!`,
      code: 200,
    };
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err);
    throw err;
  }
};
