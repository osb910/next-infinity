import StoreCard from '@/components/next-stores/StoreCard';
import Spinner from '@/ui/Spinner';
import styles from '@/components/next-stores/Store.module.css';

const FavoritesLoading = () => {
  return (
    <>
      <h1>
        Favorite Stores <Spinner />
      </h1>
      <ul className={styles.stores}>
        <StoreCard isPlaceholder />
        <StoreCard isPlaceholder />
        <StoreCard isPlaceholder />
      </ul>
    </>
  );
};

export default FavoritesLoading;
