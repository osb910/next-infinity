'use server';

import {redirect} from 'next/navigation';
import {getURL} from '@/utils/path';
import type {JsonRes} from '@/types';
import {type IUser} from '@/services/next-blog/user';
import type {Locale} from '@/l10n/next-blog/l10n.types';

export type FormState = {
  status: 'success' | 'error' | 'warning' | 'notice';
  message: string | null;
  data: any | null;
  errors?: {[x: string]: any};
  locale: Locale;
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
    const data = json.status === 'error' ? null : json.data;

    return {
      status: json.status,
      message: json.message,
      data,
      locale: prev.locale,
      ...(json.status === 'error' && {errors: json.errors}),
    };
  } catch (err) {
    console.error(err);
    return {
      status: 'error',
      message: 'Something went wrong',
      data: null,
      locale: prev.locale,
    };
  }
};

export default signUp;
