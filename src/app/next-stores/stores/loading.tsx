import StoreCard from '@/components/next-stores/StoreCard';
import styles from '@/components/next-stores/Store.module.css';
import Spinner from '@/ui/Spinner';

const StoresLoading = () => {
  return (
    <>
      <h1>
        Stores (<Spinner />)
      </h1>
      <ul className={styles.stores}>
        <StoreCard isPlaceholder />
        <StoreCard isPlaceholder />
        <StoreCard isPlaceholder />
      </ul>
    </>
  );
};

export default StoresLoading;
