import Link from 'next/link';
import styles from './MainHeader.module.css';

const MainHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href='/next-events'>Next Events</Link>
      </div>
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
