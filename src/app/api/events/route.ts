import {NextResponse} from 'next/server';
import Event from '@/services/next-events/event/event-model';
import {nextDBConnect} from '@/lib/db';

export const dynamic = 'force-static';

export const GET = async () => {
  try {
    // const isFeatured = req.nextUrl.searchParams.has('featured');
    // const filter = isFeatured ? {isFeatured: true} : {};
    await nextDBConnect({dbName: 'next-events'});
    const res = await Event.find().sort({date: 1});
    if (!res) throw new Error('Events not found');
    return NextResponse.json(res, {
      status: 200,
      headers: {'Content-Type': 'application/json'},
    });
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err);
    return NextResponse.json({error: err.message}, {status: 404});
  }
};
