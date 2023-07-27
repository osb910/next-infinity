import {NextRequest, NextResponse} from 'next/server';

export const GET = async (req: NextRequest) => {
  const response = NextResponse.redirect(new URL('/next-stores', req.url));

  await Promise.all([
    response.cookies.set({
      name: 'nextStoresToken',
      value: '',
      maxAge: -1,
    }),
    response.cookies.set({
      name: 'next-stores-logged-in',
      value: '',
      maxAge: -1,
    }),
  ]);

  return response;
};
