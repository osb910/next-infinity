import {type NextRequest, NextResponse} from 'next/server';
// import type {AppRoute} from '@/types';
import {jsonifyError} from '@/lib/helpers';
// import {getEvent} from '@/services/next-events/event/controllers';
import {nextDBConnect} from '@/lib/db';
// import Event, {IEvent} from '@/services/next-events/event/event-model';

export type EventParams = {event: string};
export const GET = async (
  req: NextRequest,
  {params}: {params: Promise<EventParams>}
) => {
  // let json;
  try {
    await nextDBConnect();
    const {event} = await params;
    console.log('eventParam', event);
    // const event = (await Event.findById(eventParam)) as IEvent;
    console.log('event api');
    // if (!event)
    //   return NextResponse.json(
    //     jsonifyError({message: 'Event not found', code: 404}),
    //     {status: 404, headers: {'Content-Type': 'application/json'}}
    //   );
    return NextResponse.json(
      {
        status: 'success',
        message: 'Event retrieved successfully',
        code: 200,
        // data: event._doc,
      },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    // const json = await getEvent(eventParam);
    // return NextResponse.json(json, {
    //   status: json.code,
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
  } catch (err) {
    const json = jsonifyError({err});
    return NextResponse.json(json, {
      status: json.code,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
