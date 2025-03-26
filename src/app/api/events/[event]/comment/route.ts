import {NextResponse} from 'next/server';
import {jsonifyError} from '@/lib/helpers';
import type {EventParams} from '../route';
import type {AppRoute} from '@/types';
import {addComment} from '@/services/next-events/event/controllers';

export const PUT: AppRoute<EventParams> = async (req, {params}) => {
  let json;
  try {
    const {event} = await params;
    const body = await req.json();
    json = await addComment(event, body);
  } catch (err) {
    json = jsonifyError({err});
  }
  return NextResponse.json(json, {status: json.code});
};
