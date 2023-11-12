import {NextRequest, NextResponse} from 'next/server';
import Store, {IStore} from '@/entities/next-stores/store/store.model';
import {HydratedDocument} from 'mongoose';
import {processUploadImage} from '@/lib/file.middleware';
import {getModelQuery} from '@/entities/models.middleware';

export type Params = {
  params: {
    storeId: string;
  };
};

export const GET = async (req: NextRequest, {params: {storeId}}: Params) => {
  const storeQuery = getModelQuery(storeId);
  try {
    const store = (await Store.findOne(storeQuery)) as IStore & {
      _doc: IStore;
    };
    if (!store) {
      return NextResponse.json(
        {
          status: 'error',
          message: `No store found with id or slug ${storeId}`,
          code: 404,
        },
        {status: 404}
      );
    }
    return NextResponse.json(
      {
        ...store._doc,
        status: 'success',
        message: `Successfully fetched ${store.name}!`,
      },
      {status: 200}
    );
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err);
    return NextResponse.json(
      {status: 'error', message: err.message, code: 500},
      {status: 500}
    );
  }
};

export const PUT = async (req: NextRequest, {params: {storeId}}: Params) => {
  const userId = req.headers.get('X-USER-ID');
  const storeQuery = getModelQuery(storeId);
  try {
    const store = (await Store.findOne(storeQuery)) as IStore;
    if (store.author.toString() !== userId) {
      const err = new Error('You are not the author of this store!');
      throw err;
    }
    const body = await req.formData();
    const data = Object.fromEntries(body);
    const {name, description, address, lat, lng} = data;
    const tags = body.getAll('tags');

    const file = await processUploadImage(body, 'photo');

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
          title: file?.title,
          ext: file?.ext,
          mimeType: file?.mimetype,
          size: file?.size,
          readableSize: file?.readableSize,
          key: file?.fileName,
          etag: file?.ETag,
        },
      }),
    };

    const res = (await Store.findOneAndUpdate(storeQuery, update, {
      new: true,
      runValidators: true,
    })) as HydratedDocument<IStore> & {_doc: HydratedDocument<IStore>};

    if (!res) {
      const err = new Error('Something went wrong!');
      throw err;
    }

    return NextResponse.json(
      {
        status: 'success',
        code: 201,
        data: res._doc,
        message: `Successfully updated ${res.name}!`,
      },
      {status: 201}
    );
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err);
    return NextResponse.json(
      {status: 'error', message: err.message, code: 500},
      {status: 500}
    );
  }
};

export const DELETE = async (req: NextRequest, {params: {storeId}}: Params) => {
  const userId = req.headers.get('X-USER-ID');
  const storeQuery = getModelQuery(storeId);
  try {
    const store = (await Store.findOne(storeQuery)) as IStore;
    if (store.author.toString() !== userId) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'You are not the author of this store!',
          code: 401,
        },
        {status: 401}
      );
    }
    const res = (await Store.findOneAndDelete(storeQuery)) as IStore;
    if (!res) {
      return NextResponse.json(
        {status: 'error', message: 'Something went wrong!', code: 500},
        {status: 500}
      );
    }
    return NextResponse.json(
      {
        status: 'success',
        code: 200,
        data: res,
        message: `Successfully deleted ${res.name}!`,
      },
      {status: 200}
    );
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err);
    return NextResponse.json(
      {status: 'error', message: err.message, code: 500},
      {status: 500}
    );
  }
};
