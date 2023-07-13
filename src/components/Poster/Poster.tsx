import Link from 'next/link';
import styles from './Poster.module.css';
import Image from 'next/image';

interface PosterProps {
  link: string;
  children: React.ReactNode;
  poster: string;
}

const Poster = ({link, children, poster}: PosterProps) => {
  return (
    <Link className={styles.link} href={link}>
      <li className={styles.poster} style={{backgroundImage: `url(${poster})`}}>
        {children}
      </li>
    </Link>
  );
};

export default Poster;
