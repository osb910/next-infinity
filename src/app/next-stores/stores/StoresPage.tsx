import Stores from '@/components/next-stores/Stores';
import Store from '@/entities/next-stores/store/store.model';
import {getURL} from '@/utils/path';

const StoresPage = async () => {
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
    console.error(err);
  }
};
export default StoresPage;
