import Link from 'next/link';
import {headers, cookies} from 'next/headers';
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from 'react-icons/md';
import NavForm from './NavForm';
import {P8nProps} from '../types';
import {env} from '@/lib/helpers';
import styles from '../Pagination.module.css';

interface PaginationProps extends P8nProps {
  count: number;
}

const PageLink = ({
  pageNum,
  page,
  getHref,
  rtl,
}: {
  pageNum: number;
  page: number;
  getHref: (pageNum: number) => string;
  rtl?: boolean;
}) => (
  <li key={pageNum} className={styles.pageNumber}>
    <Link
      href={getHref(pageNum)}
      className={`${styles.pageLink} ${pageNum === page ? styles.active : ''}`}
    >
      {rtl ? pageNum.toLocaleString('ar-EG') : pageNum}
    </Link>
  </li>
);

export const NavPagination = ({
  page,
  pages,
  count,
  rtl,
  buttonText = 'Go',
}: PaginationProps) => {
  if (pages < 2) return null;
  const limit = Math.floor(count / pages);
  const getHref = (p: number) => {
    const newUrl = new URL(headers().get('x-url') ?? env('ORIGIN') ?? '');
    newUrl.searchParams.set('p', `${p}`);
    return newUrl.toString();
  };

  return (
    <section className={styles.pagination}>
      <ul className={styles.pageNumbers}>
        {page > 1 && (
          <li className={`${styles.pageNumber} ${styles.arrow}`}>
            <Link href={getHref(page - 1)} className={`${styles.pageLink}`}>
              {rtl ? (
                <MdKeyboardDoubleArrowRight />
              ) : (
                <MdKeyboardDoubleArrowLeft />
              )}
            </Link>
          </li>
        )}
        {page > 1 && <PageLink pageNum={1} page={page} getHref={getHref} />}
        {page > 3 && (
          <li className={styles.ellipsis} key='ellipsis-before'>
            {'\u2022'.repeat(3)}
          </li>
        )}
        {page > 2 && (
          <PageLink pageNum={page - 1} page={page} getHref={getHref} />
        )}
        <PageLink pageNum={page} page={page} getHref={getHref} />
        {page * limit < count && page < pages - 1 && (
          <PageLink pageNum={page + 1} page={page} getHref={getHref} />
        )}
        {page < pages - 2 && (
          <li className={styles.ellipsis} key='ellipsis-after'>
            {'\u2022'.repeat(3)}
          </li>
        )}
        {page < pages && (
          <PageLink pageNum={pages} page={page} getHref={getHref} />
        )}
        {page < pages && (
          <li className={`${styles.pageNumber} ${styles.arrow}`}>
            <Link href={getHref(page + 1)} className={`${styles.pageLink}`}>
              {rtl ? (
                <MdKeyboardDoubleArrowLeft />
              ) : (
                <MdKeyboardDoubleArrowRight />
              )}
            </Link>
          </li>
        )}
      </ul>
      {pages > 5 && (
        <NavForm pages={pages} page={page} buttonText={buttonText} />
      )}
    </section>
  );
};

export default NavPagination;
