import {NextResponse} from 'next/server';
import {connectDB} from '@/lib/database';
import Event from '@/app/next-events/Event.model';

export const GET = async () => {
  try {
    await connectDB();
    const res = await Event.find({isFeatured: true}).sort({date: 1});
    if (!res) throw new Error('Events not found');
    return NextResponse.json(res, {status: 200});
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err);
    return NextResponse.json({error: err.message}, {status: 404});
  }
};
