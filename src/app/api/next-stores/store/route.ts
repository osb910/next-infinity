import {NextRequest, NextResponse} from 'next/server';
import Store from '@/entities/next-stores/store/store.model';
import nulter from '@/lib/nulter';
import {uploadFile} from '@/lib/s3';
import {deleteFile} from '@/utils/file';
import resize from '@/lib/resize';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export async function POST(req: NextRequest, res: NextResponse) {
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
      // const resized = await resize(file);
      // console.log(resized);
      const uploaded = await uploadFile(
        `next-stores/${file?.filename}`,
        file?.buffer!
      );
      // await deleteFile(file?.path!);
      file = {...file, ...uploaded};
    }

    const store = new Store({
      name,
      description,
      tags,
      location: {
        type: 'Point',
        coordinates: [+lng, +lat],
        address,
      },
      ...(file && {photo: {key: file?.filename, etag: file?.ETag}}),
    });
    console.log(store);
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
}