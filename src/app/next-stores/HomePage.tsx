import Stores from '@/components/next-stores/Stores';
import Store from '@/entities/next-stores/store/store.model';

const HomePage = async () => {
  const stores = await Store.find();
  return (
    <>
      <h1>Stores</h1>
      <Stores stores={stores} />
    </>
  );
};
export default HomePage;
