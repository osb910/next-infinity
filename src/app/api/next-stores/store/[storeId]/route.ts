import {HydratedDocument} from 'mongoose';
import Store, {IStore} from '@/entities/next-stores/store/store.model';
import {NextRequest, NextResponse} from 'next/server';
import {processUploadImage} from '@/lib/file.middleware';

type Params = {
  params: {
    storeId: string;
  };
};

export const PUT = async (req: NextRequest, {params: {storeId}}: Params) => {
  try {
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

    const res = (await Store.findByIdAndUpdate(storeId, update, {
      new: true,
      runValidators: true,
    })) as HydratedDocument<IStore> & {_doc: HydratedDocument<IStore>};

    if (!res) {
      const err = new Error('Something went wrong!');
      throw err;
    }

    return NextResponse.json(
      {
        ...res._doc,
        status: 'success',
        message: `Successfully updated ${res.name}!`,
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
