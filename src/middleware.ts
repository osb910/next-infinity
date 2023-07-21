import {NextResponse} from 'next/server';
import {NextRequest} from 'next/server';
import nulter from './lib/nulter';

export const middleware = async (req: NextRequest) => {
  const whitelisted =
    process.env.NODE_ENV === 'production'
      ? ['https://next-infinity.vercel.app']
      : ['http://localhost:3000'];

  const origin = req.headers.get('origin');

  if (origin && !whitelisted.includes(origin)) {
    return new NextResponse(null, {
      status: 400,
      statusText: 'Bad Request',
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Content-Type': 'text/plain',
      },
    });
  }

  if (/^\/api\/next-stores/.test(req.nextUrl.pathname)) {
    console.log('middleware', req.method, req.nextUrl.pathname);
    // const file = await nulter({req, field: 'photo', dest: '../public/uploads'});
    // if (file) {
    //   req.file = file;
    // }
    return NextResponse.next();
  }
  return NextResponse.next();
};

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: '/api/(.*)',
// };
