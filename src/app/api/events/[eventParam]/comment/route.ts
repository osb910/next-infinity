import {NextResponse} from 'next/server';
import {jsonifyError} from '@/lib/helpers';
import type {EventParams} from '../route';
import type {AppRoute} from '@/types';
import {addComment} from '@/services/next-events/event/controllers';
import {nextDBConnect} from '@/lib/db';

export const PUT: AppRoute<EventParams> = async (req, {params}) => {
  let json;
  try {
    const {eventParam} = await params;
    await nextDBConnect({dbName: 'next-events'});
    const body = await req.json();
    json = await addComment(eventParam, body);
  } catch (err) {
    json = jsonifyError({err});
  }
  return NextResponse.json(json, {status: json.code});
};
