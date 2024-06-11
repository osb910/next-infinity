'use server';

import {revalidatePath} from 'next/cache';
import {headers} from 'next/headers';
import {type IStore} from '@/services/next-stores/store';
import {getURL} from '@/utils/path';
import {JsonRes} from '@/types';

type FormState = {
  status: 'idle' | 'success' | 'error' | 'warning' | 'notice';
  message: string | null;
  data: any | null;
};

type SaveStoreAction = (prev: FormState, body: FormData) => Promise<FormState>;

export const saveStore: SaveStoreAction = async (prev, body) => {
  const headerStore = headers();
  const userId = headerStore.get('x-user-id');
  const method = prev.data ? 'PUT' : 'POST';
  try {
    const res = await fetch(
      getURL(`/api/next-stores/stores${prev.data ? `/${prev.data._id}` : ''}`),
      {
        body,
        method,
        headers: {
          'x-user-id': userId ?? '',
        },
      }
    );
    const json = (await res.json()) as JsonRes<IStore>;
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
