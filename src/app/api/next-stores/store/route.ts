import {NextRequest, NextResponse} from 'next/server';
import Store from '@/entities/next-stores/store/store.model';
import {processUploadImage} from '@/lib/file.middleware';

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
