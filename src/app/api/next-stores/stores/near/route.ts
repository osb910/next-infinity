import {NextRequest, NextResponse} from 'next/server';
import Store from '@/entities/next-stores/store/store.model';

export const GET = async (req: NextRequest) => {
  const {searchParams} = req.nextUrl;
  const lng = searchParams.get('lng');
  const lat = searchParams.get('lat');
  const maxDistance = searchParams.get('max-distance');
  const limit = searchParams.get('limit');

  if (!lng || !lat) {
    return NextResponse.json(
      {message: 'Please provide lng and lat!'},
      {status: 400}
    );
  }

  try {
    const stores = await Store.find(
      {
        location: {
          $near: {
            $maxDistance: maxDistance || 10000,
            $geometry: {
              type: 'Point',
              coordinates: [lng, lat],
            },
          },
        },
      },
      'name slug description author'
    ).limit(limit ? +limit : 10);

    return NextResponse.json(stores, {status: 200});
  } catch (err) {
    console.error(err);
    return NextResponse.json({message: 'Something went wrong!'}, {status: 500});
  }
};
