import {headers} from 'next/headers';
import Stores from '@/components/next-stores/Stores';
import ErrorAlert from '@/components/ErrorAlert';
import {getURL} from '@/utils/path';
import {type Metadata} from 'next';
import {type IStoreWithReviews} from '@/services/next-stores/store';
import type {AppPage, JsonRes} from '@/types';

export const metadata: Metadata = {
  title: 'Stores',
  description: 'Browse all stores',
};

const StoresPage: AppPage<{}, {p: string}> = async ({searchParams: {p}}) => {
  const userId = headers().get('X-USER-ID') ?? '';
  try {
    const res = await fetch(getURL(`/api/next-stores/stores?p=${p}&limit=6`), {
      headers: {
        'User-Agent': '*',
        Accept: 'application/json, text/plain, */*',
      },
    });
    const json = (await res.json()) as JsonRes<Array<IStoreWithReviews>>;
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
