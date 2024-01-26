import {geocodeReverse} from '@/lib/geo';
import {NextRequest, NextResponse} from 'next/server';

export const GET = async ({nextUrl: {searchParams}}: NextRequest) => {
  console.log('geocode reverse');
  const lng = searchParams.get('lng');
  const lat = searchParams.get('lat');
  console.log({lng, lat});

  if (!lng || lng === 'undefined' || !lat || lat === 'undefined')
    return NextResponse.json({
      status: 'error',
      code: 400,
      message: 'Missing longitude or latitude parameter',
    });

  try {
    const json = await geocodeReverse({lng, lat});
    console.log(json.features);

    return NextResponse.json(json, {status: json.code ?? 200});
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err);
    return NextResponse.json(
      {status: 'error', code: 500, message: err.message},
      {status: 500}
    );
  }
};
