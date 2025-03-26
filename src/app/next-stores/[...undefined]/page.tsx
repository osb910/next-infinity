import Link from 'next/link';
import type {AppPage} from '@/types';
import styles from '../HomePage.module.css';

const Undefined: AppPage<{undefined: Array<string>}> = async ({params}) => {
  const {undefined} = await params;
  return (
    <>
      <h1>Page not found</h1>
      <section className={styles.notFound}>
        <p>
          The page you are looking for at &ldquo;/next-stores/
          {undefined.join('/')}&rdquo; does not exist.
        </p>
        <Link href='/next-stores'>Return Home</Link>
      </section>
    </>
  );
};

export default Undefined;
