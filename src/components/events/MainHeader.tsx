import Link from 'next/link';
import styles from './MainHeader.module.css';

const MainHeader = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>
        <Link href='/next-events'>Next Events</Link>
      </h1>
      <nav className={styles.navigation}>
        <ul>
          <li>
            <Link href='/next-events/events'>Browse All Events</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
