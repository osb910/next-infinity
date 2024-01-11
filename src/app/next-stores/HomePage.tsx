import {headers} from 'next/headers';
import Link from 'next/link';
import ErrorAlert from '@/components/ErrorAlert';
import Stores from '@/components/next-stores/Stores';
import {getURL} from '@/utils/path';
import {P8n} from '@/types';
import {IStore} from '@/services/next-stores/store';
import {IReview} from '@/services/next-stores/review/review.types';
import {type Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Next Stores',
  description: 'Your Delicious Dining Places',
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
    const json = (await res.json()) as {
      status: string;
      message: string;
      data: Array<IStore & {reviews: Array<IReview>}>;
    } & P8n;
    return (
      <>
        <h1>Stores</h1>
        <Stores
          stores={json.data}
          userId={userId}
          pages={json.pages}
          page={json.page}
          count={json.count}
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
