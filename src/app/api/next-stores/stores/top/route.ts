import {NextRequest, NextResponse} from 'next/server';
import Store from '@/services/next-stores/store';
import {nextDBConnect} from '@/lib/db';

export const GET = async ({nextUrl: {searchParams}}: NextRequest) => {
  const page = searchParams.get('p');
  const limit = searchParams.get('limit');
  try {
    await nextDBConnect();
    const json = await Store.getTopStores(page, limit);
    return NextResponse.json(json, {status: json.code});
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err);
    NextResponse.json(
      {
        status: 'error',
        message: err.message,
        code: 500,
      },
      {status: 500}
    );
  }
};
