import Link from 'next/link';
import Logo from '@/components/Logo';
import styles from './page.module.css';

const NotFound = async () => {
  return (
    <>
      <header className={styles.header}>
        <Link href='/'>
          <Logo width='14rem' />
        </Link>
        <p className={styles.description}>
          Full-stack projects built with Next.js 14
        </p>
      </header>
      <main className={styles.main}>
        <h1>Page not found</h1>
        <Link href='/'>Return Home</Link>
      </main>
    </>
  );
};

export default NotFound;
