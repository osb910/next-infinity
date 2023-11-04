'use client';

import {Heart} from 'react-feather';
import {motion} from 'framer-motion';
import useUser from './useUser';
import styles from './FavoriteToggler.module.css';

interface FavoriteTogglerProps {
  favoredId: string;
}

const FavoriteToggler = ({favoredId}: FavoriteTogglerProps) => {
  const {userData, setUserData, toggleFavorite} = useUser();
  const isFavored = userData?.favorites?.includes(favoredId);
  const toggleHeart = async () => {
    if (!userData) return;
    toggleFavorite(favoredId);
    const res = await fetch(`/api/next-stores/stores/${favoredId}/heart`);
    const json = await res.json();
    if (json.status === 'success') {
      setUserData(json.data);
    }
  };
  return (
    <motion.button
      onClick={toggleHeart}
      className={`${styles.heart} ${isFavored ? styles.favored : ''}`}
      whileHover={{scale: 1.05}}
      whileFocus={{scale: 1.05}}
      whileTap={{scale: 0.95}}
      animate={{color: isFavored ? '#B01E28' : '#93939395'}}
      transition={{duration: 0.6, type: 'spring', bounce: 0.5}}
    >
      <Heart
        size={32}
        strokeWidth={1.2}
        fill={'currentColor'}
        stroke='#3E3E3E90'
      />
      <motion.span
        animate={{
          transform: isFavored ? ['translateY(0)', 'translateY(-100px)'] : [],
          opacity: isFavored ? [1, 0.9, 0] : [0, 0, 0],
          color: isFavored ? ['#3E3E3E', '#B01E28'] : ['#B01E28', '#3E3E3E'],
        }}
        transition={{duration: 1.2, type: 'spring', bounce: 0.5}}
      >
        {isFavored ? '♥️' : '♡'}
      </motion.span>
    </motion.button>
  );
};

export default FavoriteToggler;
