import Stores from '@/components/next-stores/Stores';
import Store from '@/entities/next-stores/store/store.model';

const StoresPage = async () => {
  try {
    const stores = await Store.find();
    return (
      <>
        <h1>Stores</h1>
        <Stores stores={stores} />
      </>
    );
  } catch (err) {
    console.error(err);
  }
};
export default StoresPage;
