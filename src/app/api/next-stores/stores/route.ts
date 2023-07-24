import {NextRequest, NextResponse} from 'next/server';
import Store from '@/entities/next-stores/store/store.model';
import {processUploadImage} from '@/lib/file.middleware';

export const GET = async () => {
  try {
    const stores = await Store.find().sort({createdAt: -1});
    console.log(stores);
    if (!stores) {
      const err = new Error('Something went wrong!');
      throw err;
    }
    return NextResponse.json(
      {
        stores,
        status: 'success',
        message: `Successfully fetched stores!`,
      },
      {status: 200}
    );
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err);
    return NextResponse.json(
      {status: 'error', message: err.message},
      {status: 500}
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.formData();
    const data = Object.fromEntries(body);
    const {name, description, address, lat, lng} = data;
    const tags = body.getAll('tags');

    const file = await processUploadImage(body, 'photo');

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
          title: file?.title,
          ext: file?.ext,
          mimeType: file?.mimetype,
          size: file?.size,
          readableSize: file?.readableSize,
          key: file?.fileName,
          etag: file?.ETag,
        },
      }),
    });
    if (!store) {
      const err = new Error('Something went wrong!');
      throw err;
    }
    const res = await store.save();

    return NextResponse.json(
      {
        ...store,
        status: 'success',
        message: `Successfully created ${res.name}!`,
      },
      {status: 201}
    );
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err);
    return NextResponse.json(
      {status: 'error', message: err.message},
      {status: 500}
    );
  }
};

// DELETE ALL STORES
export const DELETE = async () => {
  try {
    const res = await Store.deleteMany({});
    if (!res) {
      const err = new Error('Something went wrong!');
      throw err;
    }
    return NextResponse.json(
      {
        status: 'success',
        message: `Successfully deleted all stores!`,
      },
      {status: 200}
    );
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err);
    return NextResponse.json(
      {status: 'error', message: err.message},
      {status: 500}
    );
  }
};
