import {NextRequest, NextResponse} from 'next/server';
import Event, {IEvent} from '@/app/next-events/Event.model';

export const GET = async (
  req: NextRequest,
  {params}: {params: {event: string}}
) => {
  try {
    const event: IEvent | null = await Event.findById(params.event);
    if (!event) throw new Error('Event not found');
    return NextResponse.json(event, {status: 200});
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err);
    return NextResponse.json({error: err.message}, {status: 404});
  }
};
