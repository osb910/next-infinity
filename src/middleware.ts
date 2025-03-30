import {type NextRequest, NextResponse} from 'next/server';
import {verifyJWT} from './lib/token';
import {sendError} from './lib/helpers';
import {readLocale as readNextBlogLocale} from './l10n/getL10n';
// import {defaultLocale, locales as nextBlogLocales} from './l10n/config';

export const middleware = async (req: NextRequest) => {
  const {pathname, searchParams} = req.nextUrl;
  const dialog = searchParams.get('dialog');
  const origin = req.headers.get('origin');
  const themeCookie = req.cookies.get('theme');
  const theme = themeCookie?.value ?? 'light';
  // const userIdCookie = req.cookies.get('user-id-token');
  const localeCookie = req.cookies.get('locale');
  const localeHeader = req.headers.get('x-locale');
  let locale = localeHeader ?? localeCookie?.value;
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

  const response = NextResponse.next();

  response.headers.set('x-url', req.url);

  const ipAddress = req.headers.get('x-forwarded-for') ?? '';
  response.headers.set('x-ip', ipAddress);
  response.headers.set('x-theme', theme);
  response.cookies.set('theme', theme);

  const site = pathname.match(/^(?:\/api|\/mini-apps)?\/([-\w]+)/)?.[1];
  response.headers.set('x-site', site ?? '');

  const isRoute = !pathname.match(
    /(?=data|img|api|_next|favicon\.ico|(next|vercel)\.svg).*/
  );

  if (isRoute) {
    if (/^(\/api)?\/next-blog/.test(pathname)) {
      locale = locale ?? readNextBlogLocale(req);
      response.headers.set('x-locale', locale);
      response.cookies.set('locale', locale);
    }
  }

  if (/^(\/api)?\/next-stores(?!\/(auth|map))/.test(pathname)) {
    console.log('> middleware stores', pathname);
    if (!token && (/\/add/.test(pathname) || dialog === 'account')) {
      return NextResponse.redirect(
        new URL(
          `${pathname}?error=bad_token&dialog=login&redirect=${pathname}`,
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

      if (sub && dialog === 'login') {
        console.log('trying to login while logged in');
        const newUrl = req.nextUrl.searchParams.delete('dialog');
        console.log({newUrl});
        return NextResponse.redirect(req.nextUrl);
      }

      response.headers.set('X-USER-ID', sub);
    } catch (err) {
      if (!(err instanceof Error)) return;
      if (/\/api/.test(pathname)) {
        return sendError(
          'error',
          401,
          "Token is invalid or user doesn't exists"
        );
      }

      req.nextUrl.searchParams.set('error', 'bad_token');
      req.nextUrl.searchParams.set('dialog', 'login');
      req.nextUrl.searchParams.set('redirect', pathname);

      return NextResponse.redirect(req.nextUrl);
    }
  }
  return response;
};
