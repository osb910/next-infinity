import Spinner from '@/ui/Spinner';
import styles from './TopPage.module.css';
import Link from 'next/link';
import Image from 'next/image';

const TopPageLoading = () => {
  return (
    <>
      <h1>
        Top <Spinner /> Stores
      </h1>
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
        <tbody style={{fontFamily: 'var(--fn-loading)'}}>
          <tr key={'0'}>
            <td>
              <Link href={'#'}>
                <Image
                  src='/uploads/store.png'
                  alt='Store Image'
                  width={100}
                  height={100}
                />
              </Link>
            </td>
            <td>1</td>
            <td>
              <Link href={'#'}>Title</Link>
            </td>
            <td>0</td>
            <td>0 / 5</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default TopPageLoading;
