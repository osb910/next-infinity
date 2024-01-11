import {headers} from 'next/headers';
import Stores from '@/components/next-stores/Stores';
import ErrorAlert from '@/components/ErrorAlert';
import {type IStore} from '@/services/next-stores/store';
import {type IReview} from '@/services/next-stores/review';
import type {P8n} from '@/types';
import {getURL} from '@/utils/path';
import {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Stores | Next Stores',
  description: 'Stores page',
};

interface StoresPageProps {
  searchParams: {p: string; limit: string};
}

const StoresPage = async ({searchParams: {p, limit}}: StoresPageProps) => {
  const userId = headers().get('X-USER-ID') ?? '';
  try {
    const res = await fetch(getURL(`/api/next-stores/stores?p=${p}&limit=6`), {
      headers: {
        'User-Agent': '*',
        Accept: 'application/json, text/plain, */*',
      },
    });
    const json = (await res.json()) as {
      status: string;
      message: string;
      data: Array<IStore & {reviews: Array<IReview>}>;
    } & P8n;
    if (json.status === 'error') throw new Error(json.message);
    return (
      <>
        <h1>Stores ({json?.count ?? 0})</h1>
        <Stores
          stores={json.data}
          count={json.count}
          pages={json.pages}
          page={json.page}
          userId={userId}
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
