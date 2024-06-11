'use server';

import {JsonRes} from '@/types';
import {getURL} from '@/utils/path';

export type FormState = {
  status: 'success' | 'error' | 'warning' | 'notice';
  message: string | null;
  data: any | null;
};

type SendMessageAction = (
  prev: FormState,
  body: FormData
) => Promise<FormState>;

export const sendMessage: SendMessageAction = async (prev, body) => {
  try {
    const res = await fetch(getURL(`/api/next-blog/contact`), {
      body,
      method: 'POST',
    });
    const json = (await res.json()) as JsonRes;
    const data = json.status === 'error' ? null : json.data;
    return {
      status: json.status,
      message: json.message,
      data,
    };
  } catch (err) {
    console.error(err);
    return {status: 'error', message: 'Something went wrong', data: null};
  }
};
