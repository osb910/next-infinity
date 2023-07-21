import {NextRequest, NextResponse} from 'next/server';
export const GET = async (req: NextRequest) => {
  try {
    const {searchParams} = new URL(req.nextUrl);
    const place = searchParams.get('place');
    const res = await fetch(
      `https://api.mapbox.com/search/geocode/v6/forward?q=${place}&proximity=ip&access_token=${process.env.MAPBOX_SECRET_TOKEN}`
    );
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err);
    return NextResponse.json(
      {status: 'error', message: err.message},
      {status: 500}
    );
  }
};
