import Link from 'next/link';
import styles from './Poster.module.css';
import Image from 'next/image';
import {motion} from 'framer-motion';
import Wrapper from './Wrapper';

interface PosterProps {
  link: string;
  children: React.ReactNode;
  poster: string;
}

const Poster = ({link, children, poster}: PosterProps) => {
  return (
    <Link className={styles.link} href={link}>
      <Wrapper
        className={styles.poster}
        style={{backgroundImage: `url(${poster})`}}
      >
        {children}
      </Wrapper>
    </Link>
  );
};

export default Poster;
