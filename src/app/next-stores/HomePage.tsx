import {headers} from 'next/headers';
import Link from 'next/link';
import ErrorAlert from '@/components/ErrorAlert';
import Stores from '@/components/next-stores/Stores';
import {getURL} from '@/utils/path';
import {type Metadata} from 'next';
import {type IStoreWithReviews} from '@/services/next-stores/store';
import type {JsonRes} from '@/types';

export const metadata: Metadata = {
  title: 'Next Stores',
};

const HomePage = async () => {
  const userId = headers().get('X-USER-ID') ?? '';
  try {
    const res = await fetch(getURL('/api/next-stores/stores?limit=9'), {
      headers: {
        'User-Agent': '*',
        Accept: 'application/json, text/plain, */*',
      },
    });
    const json = (await res.json()) as JsonRes<Array<IStoreWithReviews>>;
    return (
      <>
        <h1>Stores</h1>
        <Stores
          stores={json?.data ?? []}
          userId={userId}
          pages={json?.pages ?? 1}
          page={json?.page ?? 1}
          count={json?.count ?? 0}
          paginate={false}
        />
        <Link href='/next-stores/stores'>View all stores &rarr;</Link>
      </>
    );
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err);
    return <ErrorAlert>{err.message}</ErrorAlert>;
  }
};
export default HomePage;
