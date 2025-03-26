import Link from 'next/link';
import type {AppPage, GetMetadata} from '@/types';
import styles from '../HomePage.module.css';

type Params = {undefined: Array<string>};
type SearchParams = {type: string};
type UndefinedPg = AppPage<Params, SearchParams>;

type UndefinedMetadata = GetMetadata<Params, SearchParams>;

export const generateMetadata: UndefinedMetadata = async ({
  params,
  searchParams,
}) => {
  const {undefined} = await params;
  const {type} = await searchParams;
  return {
    title: `${type ?? 'Page'} Not Found`,
  };
};

const Undefined: UndefinedPg = async ({params, searchParams}) => {
  const {undefined} = await params;
  const {type} = await searchParams;
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
