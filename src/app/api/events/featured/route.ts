import {NextResponse} from 'next/server';
import Event from '@/app/next-events/Event.model';

export const GET = async () => {
  try {
    const res = await Event.find({isFeatured: true});
    if (!res) throw new Error('Events not found');
    return NextResponse.json(res, {status: 200});
  } catch (err) {
    console.error(err);
    return NextResponse.json({error: (err as Error).message}, {status: 404});
  }
};
