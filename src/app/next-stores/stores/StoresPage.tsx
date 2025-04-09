import {headers} from 'next/headers';
import Stores from '@/components/next-stores/Stores';
import ErrorAlert from '@/components/ErrorAlert';
import {getURL} from '@/utils/path';
import {type IStoreWithReviews} from '@/services/next-stores/store';
import type {AppPage, GetMetadata, JsonRes} from '@/types';
import {cache} from 'react';
import {randArrayEl} from '@/utils/general';

export type StoresPg = AppPage<unknown, {p: string}>;
export type StoresGenMetadata = GetMetadata<unknown, {p: string}>;

const fetcher = cache(async (p: string) => {
  const res = await fetch(getURL(`/api/next-stores/stores?p=${p}&limit=6`), {
    headers: {
      'User-Agent': '*',
      Accept: 'application/json, text/plain, */*',
    },
  });
  const json = (await res.json()) as JsonRes<Array<IStoreWithReviews>>;
  return json;
});

export const generateMetadata: StoresGenMetadata = async ({searchParams}) => {
  const {p} = await searchParams;
  const json = await fetcher(p);
  const randStore = json.status === 'error' ? [] : randArrayEl(json.data ?? []);
  return {
    title: 'Stores',
    description: 'Browse all stores',
    openGraph: {
      title: 'Stores',
      description: 'Browse all stores',
      images: [
        {
          url: `/api/next-stores/files?key=${randStore?.photo?.key}`,
          width: 800,
          height: 600,
          alt: 'Stores',
        },
      ],
    },
    twitter: {
      title: 'Stores',
      description: 'Browse all stores',
      images: [`/api/next-stores/files?key=${randStore?.photo?.key}`],
    },
  };
};

const StoresPage: StoresPg = async ({searchParams}) => {
  const {p} = await searchParams;
  const userId = (await headers()).get('X-USER-ID') ?? '';
  try {
    const json = (await fetcher(p)) as JsonRes<Array<IStoreWithReviews>>;
    if (json.status === 'error') throw new Error(json.message);
    return (
      <>
        <h1>Stores ({json?.count ?? 0})</h1>
        <Stores
          stores={json?.data ?? []}
          userId={userId}
          pages={json?.pages ?? 1}
          page={json?.page ?? 1}
          count={json?.count ?? 0}
        />
      </>
    );
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err);
    return (
      <>
        <h1>Stores (0)</h1>
        <ErrorAlert>
          <p>Error getting our stores. Check your connection.</p>
          <small>{err.message}</small>
        </ErrorAlert>
      </>
    );
  }
};
export default StoresPage;
