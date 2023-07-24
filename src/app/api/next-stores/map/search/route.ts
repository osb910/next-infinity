import {NextResponse} from 'next/server';

export const dynamic = 'force-dynamic';

const endpoint = 'https://api.mapbox.com/search/geocode/v6';
const token = process.env.MAPBOX_SECRET_TOKEN;

export const GET = async (req: Request) => {
  try {
    const {searchParams} = new URL(req.url);
    const place = searchParams.get('place');
    const res = await fetch(
      `${endpoint}/forward?q=${place}&proximity=ip&access_token=${token}`
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
