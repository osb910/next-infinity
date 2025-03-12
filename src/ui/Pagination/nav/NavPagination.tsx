import Link from 'next/link';
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from 'react-icons/md';
import clsx from 'clsx';
import NavForm from './NavForm';
import type {P8nProps} from '../types';
import styles from '../Pagination.module.css';

interface PaginationProps extends P8nProps {
  count: number;
  baseUrl?: string;
  method?: 'param' | 'searchParam';
  activeClass?: string;
}

const PageLink = ({
  pageNum,
  page,
  getHref,
  rtl,
  activeClass,
}: {
  pageNum: number;
  page: number;
  getHref: (pageNum: number) => string;
  rtl?: boolean;
  activeClass?: string;
}) => (
  <li
    key={pageNum}
    className={styles.pageNumber}
  >
    <Link
      href={getHref(pageNum)}
      className={clsx(
        styles.pageLink,
        pageNum === page && styles.active,
        pageNum === page && activeClass
      )}
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
  baseUrl,
  method = 'param',
  buttonText = 'Go',
  activeClass,
  ...rest
}: PaginationProps) => {
  if (pages < 2) return null;
  const limit = Math.floor(count / pages);
  const getHref = (p: number) => {
    let newUrl = baseUrl ?? '/';
    if (method === 'param') {
      newUrl = newUrl.replace(/\/[^\/?=]+(?!.*\/)/, `$&/${p}`);
    } else {
      newUrl = newUrl.replace(/(?<=p=)[^&]+/, `${p}`);
    }
    return newUrl;
  };

  return (
    <section
      {...rest}
      className={clsx(styles.pagination, rest.className)}
    >
      <ul className={styles.pageNumbers}>
        {page > 1 && (
          <li className={`${styles.pageNumber} ${styles.arrow}`}>
            <Link
              href={getHref(page - 1)}
              className={`${styles.pageLink}`}
            >
              {rtl ? (
                <MdKeyboardDoubleArrowRight />
              ) : (
                <MdKeyboardDoubleArrowLeft />
              )}
            </Link>
          </li>
        )}
        {page > 1 && (
          <PageLink
            rtl={rtl}
            pageNum={1}
            page={page}
            getHref={getHref}
            activeClass={activeClass}
          />
        )}
        {page > 3 && (
          <li
            className={styles.ellipsis}
            key='ellipsis-before'
          >
            {'\u2022'.repeat(3)}
          </li>
        )}
        {page > 2 && (
          <PageLink
            rtl={rtl}
            pageNum={page - 1}
            page={page}
            getHref={getHref}
            activeClass={activeClass}
          />
        )}
        <PageLink
          rtl={rtl}
          pageNum={page}
          page={page}
          getHref={getHref}
          activeClass={activeClass}
        />
        {page * limit < count && page < pages - 1 && (
          <PageLink
            rtl={rtl}
            pageNum={page + 1}
            page={page}
            getHref={getHref}
            activeClass={activeClass}
          />
        )}
        {page < pages - 2 && (
          <li
            className={styles.ellipsis}
            key='ellipsis-after'
          >
            {'\u2022'.repeat(3)}
          </li>
        )}
        {page < pages && (
          <PageLink
            rtl={rtl}
            pageNum={pages}
            page={page}
            getHref={getHref}
            activeClass={activeClass}
          />
        )}
        {page < pages && (
          <li className={`${styles.pageNumber} ${styles.arrow}`}>
            <Link
              href={getHref(page + 1)}
              className={`${styles.pageLink}`}
            >
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
        <NavForm
          pages={pages}
          page={page}
          buttonText={buttonText}
        />
      )}
    </section>
  );
};

export default NavPagination;
