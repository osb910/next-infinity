import {IStore} from '@/entities/next-stores/store/store.model';
import styles from './Store.module.css';
import StoreCard from './StoreCard';

interface StoresProps {
  stores: IStore[];
}

const Stores = ({stores}: StoresProps) => {
  return (
    <ul className={styles.stores}>
      {stores.map((store: IStore) => (
        <StoreCard store={store} key={store._id?.toString?.()} />
      ))}
    </ul>
  );
};

export default Stores;
