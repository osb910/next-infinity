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
      <li className={styles.poster}>
        <Image
          src={poster}
          alt=''
          width={256}
          height={256}
          className={styles.image}
        />
        {children}
      </li>
    </Link>
  );
};

export default Poster;
