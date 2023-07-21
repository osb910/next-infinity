import {HydratedDocument} from 'mongoose';
import Store, {IStore} from '@/entities/next-stores/store/store.model';
import nulter from '@/lib/nulter';
import {NextRequest, NextResponse} from 'next/server';
import {uploadFile} from '@/lib/s3';
import {deleteFile} from '@/utils/file';

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
    const tags = [];
    for (const [key, value] of body.entries()) {
      key === 'tags' && tags.push(value);
    }

    let file;

    const photo = body.get('photo') as File;
    if (photo && photo.name !== 'undefined') {
      file = await nulter({
        body,
        field: 'photo',
        // dest: '../public/uploads',
      });
      const uploaded = await uploadFile(
        `next-stores/${file?.filename}`,
        file?.buffer!
      );
      console.log({uploaded});
      // await deleteFile(file?.path!);
      file = {...file, ...uploaded};
    }

    const update = {
      name,
      description,
      tags,
      location: {
        type: 'Point',
        coordinates: [+lng, +lat],
        address,
      },
      ...(file && {photo: {key: file?.filename, etag: file?.ETag}}),
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
