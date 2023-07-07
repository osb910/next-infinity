import {NextResponse} from 'next/server';
import Event from '@/app/next-events/Event.model';
import {dbConnectNextEvents} from '@/app/next-events/database';

export const GET = async () => {
  try {
    await dbConnectNextEvents();
    const res = await Event.find({isFeatured: true});
    if (!res) throw new Error('Events not found');
    return NextResponse.json(res, {status: 200});
  } catch (err) {
    console.error(err);
    return NextResponse.json({error: (err as Error).message}, {status: 404});
  }
};
