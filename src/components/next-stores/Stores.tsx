import StoreCard from './StoreCard';
import Pagination from '@/ui/Pagination';
import {type IStoreWithReviews} from '@/services/next-stores/store';
import type {P8n} from '@/types';
import styles from './Store.module.css';

type StoresProps = Pick<P8n, 'count' | 'pages' | 'page'> & {
  stores: Array<IStoreWithReviews>;
  userId: string;
  paginate?: boolean;
};

const Stores = ({
  stores,
  userId,
  count,
  pages,
  page,
  paginate = true,
}: StoresProps) => {
  // const [list, setList] = useState(stores);
  // const addItems = (data: Array<IStore & {reviews: Array<IReview>}>) =>
  //   setList([...list, ...data]);

  return (
    <ul className={styles.stores}>
      {stores?.map(store => (
        <li key={store._id}>
          <StoreCard item={store} userId={userId!} />
        </li>
      ))}
      {paginate && (
        <Pagination
          pages={pages}
          page={page}
          count={count}
          // endpoint={getURL('/api/next-stores/stores?limit=5')}
          // addItems={addItems}
          // type='auto'
          // observedSelector={`[data-item="${list.at(-1)!._id}"]`}
        />
      )}
    </ul>
  );
};

export default Stores;
