import {IStore} from '@/entities/next-stores/store/store.model';
import styles from './Store.module.css';
import Tags from './TagsList';
import Image from 'next/image';
import Link from 'next/link';
import InteractiveMap from './InteractiveMap';

interface SingleStoreProps {
  store?: IStore;
  isPlaceholder?: boolean;
}

const SingleStore = ({store, isPlaceholder}: SingleStoreProps) => {
  if (isPlaceholder || !store)
    return (
      <article style={{fontFamily: 'var(--font-family-loading)'}}>
        <h2 className={`${styles.title} ${styles.singleTitle}`}>Title</h2>
        <section className={styles.storeHero}>
          <Image
            className={styles.storeImage}
            src={`/api/next-stores/files/store.png`}
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
    name,
    slug,
    description,
    location: {
      coordinates: [lng, lat],
      address,
    },
    tags,
    photo,
  } = store;

  return (
    <article className={styles.singleStore}>
      <h2 className={`${styles.title} ${styles.singleTitle}`}>
        <Link href={`/next-stores/store/${slug}`}>{name}</Link>
      </h2>
      <section className={styles.storeHero}>
        <Image
          className={styles.storeImage}
          src={`/api/next-stores/files/${photo}`}
          alt='Store Image'
          width={300}
          height={300}
        />
      </section>
      <section className={styles.storeDetails}>
        <InteractiveMap
          lng={lng}
          lat={lat}
          token={process.env.MAPBOX_PUBLIC_TOKEN!}
        />
        <p className={styles.storeLocation}>{address}</p>
        <p>{description}</p>
        {store.tags && <Tags tags={tags} />}
      </section>
    </article>
  );
};

export default SingleStore;
