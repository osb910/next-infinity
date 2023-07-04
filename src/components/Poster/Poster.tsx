import Link from 'next/link';
import styles from './Poster.module.css';
import Wrapper from './Wrapper';

interface PosterProps {
  link: string;
  children: React.ReactNode;
  poster: string;
}

const Poster = ({link, children, poster}: PosterProps) => {
  return (
    <Link className={styles.link} href={link}>
      <Wrapper poster={poster} className={styles.poster}>
        {children}
      </Wrapper>
    </Link>
  );
};

export default Poster;
