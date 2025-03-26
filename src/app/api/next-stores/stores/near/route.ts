import {type NextRequest, NextResponse} from 'next/server';
import Store from '@/services/next-stores/store';
import {getNearby} from '@/services/lib';
import {type Request} from 'request-ip';

export const dynamic = 'force-dynamic';

export const GET = async (req: NextRequest & Request) => {
  try {
    const json = await getNearby(Store, req);

    return NextResponse.json(json, {status: json.code});
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err);
    return NextResponse.json(
      {status: 'error', code: 500, message: err.message},
      {status: 500}
    );
  }
};
