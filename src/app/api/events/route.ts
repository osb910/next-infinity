import {NextResponse} from 'next/server';
import Event from '@/app/next-events/events/Event.model';

export const GET = async (req: Request) => {
  try {
    const {searchParams} = new URL(req.url);
    const isFeatured = searchParams.has('featured');
    const filter = isFeatured ? {isFeatured: true} : {};
    const res = await Event.find(filter).limit(3);
    return NextResponse.json(res);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
