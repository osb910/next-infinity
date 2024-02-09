import Link from 'next/link';
import type {AppPage} from '@/types';
import styles from '../HomePage.module.css';

const Undefined: AppPage<{undefined: Array<string>}> = async ({
  params: {undefined},
}) => {
  return (
    <>
      <h1>Page not found</h1>
      <section className={styles.notFound}>
        <p>
          The page you are looking for at &ldquo;/next-blog/
          {undefined.join('/')}&rdquo; does not exist.
        </p>
        <Link href='/next-blog'>Return Home</Link>
      </section>
    </>
  );
};

export default Undefined;
