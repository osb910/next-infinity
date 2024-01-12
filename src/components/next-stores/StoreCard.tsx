'use server';

import Image from 'next/image';
import Link from 'next/link';
import {Edit} from 'react-feather';
import {MdOutlineRateReview} from 'react-icons/md';
import FavoriteToggler from './FavoriteToggler';
import Eraser from './Eraser';
import {type IStoreWithReviews} from '@/services/next-stores/store';
import styles from './Store.module.css';

export interface StoreProps {
  item: IStoreWithReviews;
  userId: string;
}

const StoreCard = ({item, userId}: StoreProps) => {
  const id = typeof item._id === 'object' ? item._id.toString() : item._id;
  const author =
    typeof item.author === 'object' ? item.author.toString() : item.author;
  const truncatedDescription = item.description
    .split(' ')
    .slice(0, 25)
    .join(' ');
  return (
    <article className={styles.store} data-item={id} id={id}>
      <section className={styles.storeHero}>
        <section className={styles.storeActions}>
          {!!userId && <FavoriteToggler favoredId={id!} />}
          {author === userId && (
            <>
              <Link
                href={`/next-stores/stores/${id}/edit`}
                title={`Edit ${item.name}`}
              >
                <Edit size={28} />
              </Link>
              <Eraser itemId={id!} endpoint={`/api/next-stores/stores/${id}`} />
            </>
          )}
          {!!item?.reviews?.length && (
            <div className={styles.reviewCount}>
              <MdOutlineRateReview size={28} />
              <sub>{item?.reviews?.length}</sub>
            </div>
          )}
        </section>
        <Image
          className={styles.storeImage}
          src={`/api/next-stores/files/${item?.photo?.key}`}
          alt='Store Image'
          width={360}
          height={360}
        />
        <h2 className={styles.title}>
          <Link href={`/next-stores/stores/${item.slug}`}>{item.name}</Link>
        </h2>
      </section>
      <p className={styles.storeDescription} dir='auto'>
        {truncatedDescription}
        {item.description.length > 25 && '...'}
      </p>
    </article>
  );
};

export default StoreCard;
