import {NextRequest, NextResponse} from 'next/server';

const endpoint = 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/static';
const token = process.env.MAPBOX_SECRET_TOKEN;

export const GET = async (req: NextRequest) => {
  const {searchParams} = new URL(req.url);
  const lng = searchParams.get('lng');
  const lat = searchParams.get('lat');

  try {
    const res = await fetch(
      `${endpoint}/${lng},${lat},10,0/1200x800?access_token=${token}`
    );
    const buffer = Buffer.from(await res.arrayBuffer());
    const response = new NextResponse(buffer, {
      headers: {
        'content-type': 'image/png',
        'content-length': buffer.byteLength.toString(),
      },
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};
