import {NextResponse} from 'next/server';
import Event from '@/app/next-events/Event.model';
import {dbConnectNextEvents} from '@/app/next-events/database';

export const GET = async () => {
  try {
    await dbConnectNextEvents();
    // const isFeatured = req.nextUrl.searchParams.has('featured');
    // const filter = isFeatured ? {isFeatured: true} : {};
    const res = await Event.find().sort({date: 1});
    if (!res) throw new Error('Events not found');
    return NextResponse.json(res, {status: 200});
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err);
    return NextResponse.json({error: err.message}, {status: 404});
  }
};
