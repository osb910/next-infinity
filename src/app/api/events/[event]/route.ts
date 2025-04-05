import {NextResponse} from 'next/server';
import type {AppRoute} from '@/types';
import {jsonifyError} from '@/lib/helpers';
import {getEvent} from '@/services/next-events/event/controllers';
import {nextDBConnect} from '@/lib/db';

export type EventParams = {event: string};
export const GET: AppRoute<EventParams> = async (req, {params}) => {
  // let json;
  try {
    await nextDBConnect({dbName: 'next-events'});
    const {event: eventParam} = await params;
    const json = await getEvent(eventParam);
    return NextResponse.json(json, {
      status: json.code,
      headers: {
        'Content-Type': 'application/json',
      },
    });
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
