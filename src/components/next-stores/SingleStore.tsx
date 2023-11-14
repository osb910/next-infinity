import Image from 'next/image';
import Link from 'next/link';
import {headers} from 'next/headers';
import {Edit} from 'react-feather';
import {IStore} from '@/entities/next-stores/store/store.model';
import InteractiveMap from './InteractiveMap';
import FavoriteToggler from './FavoriteToggler';
import Eraser from './Eraser';
import Tags from './TagsList';
import styles from './Store.module.css';
import ReviewForm from './ReviewForm';

interface SingleStoreProps {
  store?: IStore;
  isPlaceholder?: boolean;
}

const SingleStore = ({store, isPlaceholder}: SingleStoreProps) => {
  if (isPlaceholder || !store)
    return (
      <article
        className={styles.singleStore}
        style={{fontFamily: 'var(--font-family-loading)'}}
      >
        <h1 className={`${styles.title} ${styles.singleTitle}`}>Title</h1>
        <section className={styles.storeHero}>
          <Image
            className={styles.storeImage}
            src='/uploads/store.png'
            alt='Store Image'
            width={300}
            height={300}
          />
        </section>
        <section className={styles.storeDetails}>
          <Image
            className={styles.storeMap}
            src={`/api/next-stores/map/static?lng=0&lat=0`}
            alt='Store Map'
            width={900}
            height={550}
          />
          <p className={styles.storeLocation}>Address</p>
          <p>Description</p>
        </section>
      </article>
    );

  const {
    _id,
    name,
    slug,
    description,
    location: {
      coordinates: [lng, lat],
      address,
    },
    tags,
    photo,
    author,
  } = store;

  const id = typeof _id === 'object' ? _id.toString() : _id;
  const authorId = typeof author === 'object' ? author.toString() : author;

  const headersList = headers();
  const userId = headersList.get('X-USER-ID');

  return (
    <article className={styles.singleStore}>
      <h1 className={`${styles.title} ${styles.singleTitle}`}>
        <Link href={`/next-stores/stores/${slug}`}>{name}</Link>
      </h1>
      <section className={styles.storeHero}>
        <section className={styles.storeActions}>
          {userId && <FavoriteToggler favoredId={id!} />}
          {authorId === userId && (
            <>
              <Link href={`/next-stores/stores/${id}/edit`}>
                <Edit size={28} />
              </Link>
              <Eraser itemId={id!} />
            </>
          )}
        </section>
        <Image
          className={styles.storeImage}
          src={
            photo?.key
              ? `/api/next-stores/files/${photo?.key}`
              : '/uploads/store.png'
          }
          alt='Store Image'
          width={300}
          height={300}
        />
      </section>
      <section className={styles.storeDetails}>
        <InteractiveMap lng={lng} lat={lat} />
        <p className={styles.storeLocation}>{address}</p>
        <p className={styles.storeDescription}>{description}</p>
        {store.tags && <Tags tags={tags} />}
      </section>
      <section className={styles.reviews}>
        <h2 className={styles.reviewsTitle}>Reviews</h2>
        <ReviewForm
          userId={userId ?? ''}
          endpoint={`/api/next-stores/stores/${store._id!.toString()}/reviews`}
        />
      </section>
    </article>
  );
};

export default SingleStore;
