import {NextResponse} from 'next/server';
import type {AppRoute} from '@/types';
import {jsonifyError} from '@/lib/helpers';
import {getEvent} from '@/services/next-events/event/controllers';

export type EventParams = {event: string};
export const GET: AppRoute<EventParams> = async (req, {params}) => {
  let json;
  try {
    const {event} = await params;
    json = await getEvent(event);
  } catch (err) {
    json = jsonifyError({err});
  }
  return NextResponse.json(json, {
    status: json.code,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
