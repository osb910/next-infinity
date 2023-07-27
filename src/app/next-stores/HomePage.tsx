import ErrorAlert from '@/components/ErrorAlert';
import Stores from '@/components/next-stores/Stores';
import {getURL} from '@/utils/path';

const HomePage = async () => {
  try {
    const res = await fetch(getURL('/api/next-stores/stores'), {
      headers: {
        'User-Agent': '*',
        Accept: 'application/json, text/plain, */*',
      },
    });
    const data = await res.json();
    return (
      <>
        <h1>Stores</h1>
        <Stores stores={data.stores} />
      </>
    );
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err);
    return <ErrorAlert>{err.message}</ErrorAlert>;
  }
};
export default HomePage;
