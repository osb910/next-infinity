import Link from 'next/link';
import type {AppPage, GetMetadata} from '@/types';
import styles from '../HomePage.module.css';

type UndefinedPg = AppPage<{undefined: Array<string>}, {type: string}>;

export const generateMetadata: GetMetadata<UndefinedPg> = async ({
  params: {undefined},
  searchParams: {type},
}) => {
  return {
    title: `${type ?? 'Page'} Not Found`,
  };
};

const Undefined: UndefinedPg = async ({
  params: {undefined},
  searchParams: {type},
}) => {
  return (
    <>
      <h1>{type ?? 'Page'} not found</h1>
      <section className={styles.notFound}>
        <p>
          The {type ? type.toLowerCase() : 'page'} you are looking for at
          &ldquo;{undefined.join('/')}&rdquo; does not exist.
        </p>
        <Link href='/next-blog'>Return Home</Link>
      </section>
    </>
  );
};

export default Undefined;
