import {NextRequest, NextResponse} from 'next/server';

export const POST = async (req: NextRequest) => {
  const referer = req.headers.get('referer');
  const response = NextResponse.json(
    {
      status: 'success',
      message: 'Goodbye!',
      code: 200,
    },
    {status: 200}
  );

  try {
    await Promise.all([
      response.cookies.set({
        name: 'nextStoresToken',
        value: '',
        maxAge: -1,
      }),
      response.cookies.set({
        name: 'next-stores-user-id',
        value: '',
        maxAge: -1,
      }),
    ]);
    return response;
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err);
    return NextResponse.json(
      {status: 'error', message: err.message, code: 500},
      {status: 500}
    );
  }
};
