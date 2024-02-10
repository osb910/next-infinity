import Image from 'next/image';
import Link from 'next/link';
import {headers} from 'next/headers';
import {Edit} from 'react-feather';
import Reviews from './Reviews';
// import InteractiveMap from '@/ui/InteractiveMap';
import FavoriteToggler from './FavoriteToggler';
import Eraser from './Eraser';
import Tags from './TagsList';
import {type IStore} from '@/services/next-stores/store';
import {type IReview} from '@/services/next-stores/review';
import styles from './Store.module.css';
import dynamic from 'next/dynamic';
import Spinner from '@/ui/Spinner';

const InteractiveMap = dynamic(() => import('@/ui/InteractiveMap'), {
  loading: () => <Spinner />,
  ssr: false,
});

interface SingleStoreProps {
  store?: IStore & {reviews?: Array<IReview>};
  isPlaceholder?: boolean;
}

const SingleStore = ({store, isPlaceholder}: SingleStoreProps) => {
  if (isPlaceholder || !store)
    return (
      <article
        className={styles.singleStore}
        style={{fontFamily: 'var(--fn-loading)'}}
      >
        <h1 className={`${styles.title} ${styles.singleTitle}`}>Title</h1>
        <section className={styles.storeHero}>
          <Image
            className={styles.storeImage}
            src='/uploads/store.png'
            alt='Store Image'
            width={360}
            height={360}
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
  const mapStyle: Record<string, any> = {
    '--bg-img': `linear-gradient(
    to right,
    hsla(54, 82%, 78%, 0.7) 0% 15%,
    hsla(32, 58%, 36%, 0.7) 20% 35%,
    hsla(54, 82%, 78%, 0.7) 45% 55%,
    hsla(32, 58%, 36%, 0.7) 65% 80%,
    hsla(54, 82%, 78%, 0.7) 85% 100%
  )`,
  };

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
              <Eraser itemId={id!} endpoint={`/api/next-stores/stores/${id}`} />
            </>
          )}
        </section>
        <Image
          className={styles.storeImage}
          src={`/api/next-stores/files/${photo?.key}`}
          alt='Store Image'
          width={360}
          height={360}
        />
      </section>
      <section className={styles.storeDetails}>
        <InteractiveMap
          locations={[{lng, lat, id, title: name}]}
          useAttribution={false}
          useScaleLine={false}
          useZoomSlider={false}
          style={mapStyle}
          buttonStyle={{'--bg': 'rgba(144, 94, 38, 0.67)'}}
        />
        <p className={styles.storeLocation}>{address}</p>
        <p className={styles.storeDescription} dir='auto'>
          {description}
        </p>
        {tags && <Tags tags={tags} />}
      </section>
      <section className={styles.reviews}>
        <h2 className={styles.reviewsTitle}>Reviews</h2>
        <Reviews
          endpoint={`/api/next-stores/stores/${id}/reviews`}
          reviews={store.reviews ?? []}
        />
      </section>
    </article>
  );
};

export default SingleStore;
