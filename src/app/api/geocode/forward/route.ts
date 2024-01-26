import {geocodeForward} from '@/lib/geo';
import {NextRequest, NextResponse} from 'next/server';

export const GET = async ({nextUrl: {searchParams}}: NextRequest) => {
  const q = searchParams.get('q');

  if (!q)
    return NextResponse.json({
      status: 'error',
      code: 400,
      message: 'Missing query parameter',
    });

  try {
    const json = await geocodeForward({q});
    console.log({json});

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
