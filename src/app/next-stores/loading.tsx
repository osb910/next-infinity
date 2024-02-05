import Link from 'next/link';
import StoreCard from '@/components/next-stores/StoreCard';
import styles from '@/components/next-stores/Store.module.css';
import Spinner from '@/ui/Spinner';

const HomePageLoading = () => {
  return (
    <>
      <h1>
        Stores <Spinner />
      </h1>
      <ul className={styles.stores}>
        <StoreCard isPlaceholder />
        <StoreCard isPlaceholder />
        <StoreCard isPlaceholder />
      </ul>
      <Link href='/next-stores/stores'>View all stores &rarr;</Link>
    </>
  );
};

export default HomePageLoading;
