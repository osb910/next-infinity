import {NextResponse} from 'next/server';
import type {AppRoute} from '@/types';
import {jsonifyError} from '@/lib/helpers';
import {getEvent} from '@/services/next-events/event/controllers';

export type EventParams = {eventParam: string};
export const GET: AppRoute<EventParams> = async (req, {params}) => {
  let json;
  try {
    const {eventParam} = await params;
    json = await getEvent(eventParam);
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
