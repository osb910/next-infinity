import {NextResponse} from 'next/server';
import Event, {IEvent} from '@/app/next-events/Event.model';

export const GET = async (
  req: Request,
  {params}: {params: {event: string}}
) => {
  try {
    const event: IEvent | null = await Event.findById(params.event);
    if (!event) throw new Error('Event not found');
    return NextResponse.json(event, {status: 200});
  } catch (err) {
    console.error(err);
    return NextResponse.json({error: (err as Error).message}, {status: 404});
  }
};
