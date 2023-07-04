import {NextResponse} from 'next/server';
import Event from '@/app/next-events/events/Event.model';

// type Route = (
//   req: Request,
//   {params}: {params: {event: string}}
// ) => Promise<NextResponse>;

export const GET = async (
  req: Request,
  {params}: {params: {event: string}}
) => {
  try {
    const res = await Event.findById(params.event);
    return NextResponse.json(res);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
