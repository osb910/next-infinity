import {IStore} from '@/entities/next-stores/store/store.model';
import styles from './Store.module.css';
import Tags from './Tags';

interface SingleStoreProps {
  store: IStore;
}

const SingleStore = ({store}: SingleStoreProps) => {
  return (
    <li>
      <h2 className={styles.storeName}>{store.name}</h2>
      <div className={styles.store}>
        <div className={styles.storeHero}>
          {/* <img
            className={styles.storeImage}
            src={`/uploads/${store.photo || 'store.png'}`}
            alt='Store Image'
          /> */}
          <h2 className={`${styles.title} ${styles.singleTitle}`}>
            <a href={`/store/${store.slug}`}>{store.name}</a>
          </h2>
        </div>

        <div className={styles.storeDetails}>
          <pre>{JSON.stringify(store, null, 2)}</pre>
          {/* <img
            className={styles.storeMap}
            src={h.staticMap(store.location.coordinates)}
            alt='Store Map'
          /> */}
          <p className={styles.storeLocation}>{store.location.address}</p>
          <p>{store.description}</p>

          {store.tags && <Tags tags={store.tags} />}
        </div>
      </div>
    </li>
  );
};

export default SingleStore;
