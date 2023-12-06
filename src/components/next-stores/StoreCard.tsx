import {headers} from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import {Edit} from 'react-feather';
import styles from './Store.module.css';
import {IStore} from '@/models/next-stores/store/store.model';
import FavoriteToggler from './FavoriteToggler';
import Eraser from './Eraser';

interface StoreProps {
  store: IStore;
}

const StoreCard = ({store}: StoreProps) => {
  const id = typeof store._id === 'object' ? store._id.toString() : store._id;
  const author =
    typeof store.author === 'object' ? store.author.toString() : store.author;
  try {
    const headersList = headers();
    const userId = headersList.get('X-USER-ID');
    const truncatedDescription = store.description
      .split(' ')
      .slice(0, 25)
      .join(' ');

    return (
      <li className={styles.store} data-item={id}>
        <section className={styles.storeHero}>
          <section className={styles.storeActions}>
            {userId && <FavoriteToggler favoredId={id!} />}
            {author === userId && (
              <>
                <Link
                  href={`/next-stores/stores/${id}/edit`}
                  title={`Edit ${store.name}`}
                >
                  <Edit size={28} />
                </Link>
                <Eraser
                  itemId={id!}
                  endpoint={`/api/next-stores/stores/${id}`}
                />
              </>
            )}
          </section>
          <Image
            className={styles.storeImage}
            src={
              store?.photo?.key
                ? `/api/next-stores/files/${store.photo.key}`
                : '/uploads/store.png'
            }
            alt='Store Image'
            width={360}
            height={360}
          />
          <h2 className={styles.title}>
            <Link href={`/next-stores/stores/${store.slug}`}>{store.name}</Link>
          </h2>
        </section>
        <p className={styles.storeDescription}>
          {truncatedDescription}
          {store.description.length > 25 && '...'}
        </p>
      </li>
    );
  } catch (err) {
    console.log(err);
  }
};

export default StoreCard;
