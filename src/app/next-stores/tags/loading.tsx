import Link from 'next/link';
import StoreCard from '@/components/next-stores/StoreCard';
import storeStyles from '@/components/next-stores/Store.module.css';
import styles from '@/components/next-stores/Tags.module.css';
import Spinner from '@/ui/Spinner';

const TagsLoading = () => {
  return (
    <>
      <h1>
        Tags <Spinner />
      </h1>
      <ul className={styles.tags}>
        <li
          className={styles.tag}
          key={'0'}
          style={{fontFamily: 'var(--fn-loading)'}}
        >
          <Link className={`${styles.tagLink}`} href={'#'}>
            <span className={styles.tagText}>#Tag Title</span>
            <span className={styles.tagCount}>#0</span>
          </Link>
        </li>
      </ul>
      <ul className={storeStyles.stores}>
        <StoreCard isPlaceholder />
        <StoreCard isPlaceholder />
        <StoreCard isPlaceholder />
      </ul>
    </>
  );
};

export default TagsLoading;
