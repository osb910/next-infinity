import Image from 'next/image';
import Link from 'next/link';
import {IReview} from '@/services/next-stores/review/review.types';
import {IStore} from '@/services/next-stores/store';
import {getURL} from '@/utils/path';
import styles from './TopPage.module.css';

const TopPage = async () => {
  try {
    const res = await fetch(getURL('/api/next-stores/stores/top'), {
      headers: {
        'User-Agent': '*',
        Accept: 'application/json, text/plain, */*',
      },
    });
    const json = (await res.json()) as {
      count: number;
      data: Array<IStore & {reviews: Array<IReview>; averageRating: number}>;
    };
    return (
      <>
        <h1>Top {json.count} Stores</h1>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Photo</th>
              <th>Ranking</th>
              <th>Name</th>
              <th>Reviews</th>
              <th>Average Rating</th>
            </tr>
          </thead>
          <tbody>
            {json.data.map((store, idx) => (
              <tr key={store._id}>
                <td>
                  <Link href={`stores/${store.slug}`}>
                    <Image
                      src={`/api/next-stores/files/${store?.photo?.key}`}
                      alt={store.name}
                      width={100}
                      height={100}
                    />
                  </Link>
                </td>
                <td>{idx + 1}</td>
                <td>
                  <Link href={`stores/${store.slug}`}>{store.name}</Link>
                </td>
                <td>{store.reviews.length}</td>
                <td>{Math.round(store.averageRating * 100) / 100} / 5</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  } catch (err) {
    console.error(err);
  }
};
export default TopPage;
