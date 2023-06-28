import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        {'<'}Next{' {30} />'}
      </h1>
      <p className={styles.description}>
        A collection of 30 mini-apps built with Next.js
      </p>

      <ol className={styles.apps}>
        <li>
          <Link href='/mini-apps/drum-kit'>Drum Kit</Link>
        </li>
        <li>
          <Link href='/mini-apps/analog-clock'>Analog Clock</Link>
        </li>
      </ol>
    </main>
  );
}
