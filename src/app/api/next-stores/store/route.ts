import {NextRequest, NextResponse} from 'next/server';
import Store from '@/entities/next-stores/store/store.model';
import nulter from '@/utils/nulter';
import {redirect} from 'next/navigation';

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

    const file = await nulter({
      body,
      field: 'photo',
      dest: '../public/uploads',
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
      photo: file?.filename,
    });
    console.log(store);
    if (!store) {
      const err = new Error('Something went wrong!');
      throw err;
    }
    // await store.save();

    redirect(`/next-stores/store/${store.slug}`);

    return NextResponse.json(
      {...store, status: 'success', message: 'Store created!'},
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
