'use client'; // Error components must be Client Components

import Logo from '@/components/Logo';
import Link from 'next/link';
import {useEffect} from 'react';
import styles from './page.module.css';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

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
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </main>
    </>
  );
}
