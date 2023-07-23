import Stores from '@/components/next-stores/Stores';
import {getURL} from '@/utils/path';

const HomePage = async () => {
  const res = await fetch(getURL('/api/next-stores/stores'));
  const data = await res.json();
  return (
    <>
      <h1>Stores</h1>
      <Stores stores={data.stores} />
    </>
  );
};
export default HomePage;
