'use server';

import {redirect} from 'next/navigation';
import {getURL} from '@/utils/path';
import type {JsonRes} from '@/types';
import {type IUser} from '@/services/next-blog/user';

export type FormState = {
  status: 'idle' | 'success' | 'error' | 'warning' | 'notice';
  message: string | null;
  data: IUser | null;
};

export type SignUpAction = (
  prev: FormState,
  body: FormData
) => Promise<FormState>;

const signUp: SignUpAction = async (prev, body) => {
  try {
    const res = await fetch(getURL(`/api/next-blog/auth/sign-up`), {
      body,
      method: 'POST',
    });
    const json = (await res.json()) as JsonRes<IUser>;
    return {
      status: json.status,
      message: json.message,
      data: json.data ?? null,
    };
  } catch (err) {
    console.error(err);
    return {status: 'error', message: 'Something went wrong', data: null};
  }
};

export default signUp;
