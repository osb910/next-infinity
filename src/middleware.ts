import {NextResponse} from 'next/server';
import {NextRequest} from 'next/server';
import {verifyJWT} from './lib/token';
import {sendError} from './lib/helpers';

export const middleware = async (req: NextRequest) => {
  const {pathname, searchParams} = req.nextUrl;
  const subPage = searchParams.get('sub-page');
  const origin = req.headers.get('origin');
  const authCookie = req.cookies.get('nextStoresToken');
  const authHeader = req.headers.get('Authorization');
  const token = authCookie
    ? authCookie?.value
    : authHeader?.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : undefined;

  const whitelisted =
    process.env.NODE_ENV === 'production'
      ? ['https://next-infinity.vercel.app', 'http://localhost:3000']
      : ['http://localhost:3000'];

  if (origin && !whitelisted.includes(origin)) {
    console.log(`Origin ${origin} not allowed`);
    return new NextResponse(null, {
      status: 400,
      statusText: 'Bad Request',
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Content-Type': 'text/plain',
      },
    });
  }

  if (/^(\/api)?\/next-stores(?!\/(auth|map))/.test(pathname)) {
    console.log('middleware', req.method, pathname);

    const response = NextResponse.next();

    if (!token && (/\/add/.test(pathname) || subPage === 'account')) {
      return NextResponse.redirect(
        new URL(
          `${pathname}?error=bad_token&sub-page=login&redirect=${pathname}`,
          req.url
        )
      );
    }
    if (!token) return response;
    try {
      const {sub} = await verifyJWT<{sub: string}>(
        token,
        process.env.NEXT_STORES_JWT_SECRET!
      );

      if (sub && subPage === 'login') {
        console.log('trying to login while logged in');
        const newUrl = req.nextUrl.searchParams.delete('sub-page');
        console.log({newUrl});
        return NextResponse.redirect(new URL(pathname, req.url));
      }

      response.headers.set('X-USER-ID', sub);

      return response;
    } catch (err) {
      if (!(err instanceof Error)) return;
      if (/\/api/.test(pathname)) {
        return sendError(
          'error',
          401,
          "Token is invalid or user doesn't exists"
        );
      }

      return NextResponse.redirect(
        new URL(`${pathname}?error=bad_token&sub-page=login`, req.url)
      );
    }
  }
  return NextResponse.next();
};

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: '/api/(.*)',
// };
