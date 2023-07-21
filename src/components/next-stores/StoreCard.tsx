import Image from 'next/image';
import Link from 'next/link';
import styles from './Store.module.css';
import {IStore} from '@/entities/next-stores/store/store.model';

interface StoreProps {
  store: IStore;
}

const StoreCard = ({store}: StoreProps) => {
  const truncatedDescription = store.description
    .split(' ')
    .slice(0, 25)
    .join(' ');

  return (
    <li className={styles.store}>
      <section className={styles.storeHero}>
        <section className={styles.storeActions}>
          <section
            className={`${styles.storeAction} ${styles.storeActionEdit}`}
          >
            <Link href={`/next-stores/stores/${store._id}/edit`}>
              <Image
                alt='Pencil icon'
                src='/img/icons/pencil.svg'
                width={48}
                height={48}
              />
            </Link>
          </section>
        </section>
        <Image
          className={styles.storeImage}
          src={`/api/next-stores/files/${store.photo.key || 'store.png'}`}
          alt='Store Image'
          width={360}
          height={360}
        />
        <h2 className={styles.title}>
          <Link href={`/next-stores/store/${store.slug}`}>{store.name}</Link>
        </h2>
      </section>
      <section className={styles.storeDetails}>
        <p>{truncatedDescription}</p>
      </section>
    </li>
  );
};

export default StoreCard;
