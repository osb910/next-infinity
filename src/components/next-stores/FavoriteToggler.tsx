'use client';

import {Heart} from 'react-feather';
import {motion} from 'framer-motion';
import useUser from './useUser';
import styles from './FavoriteToggler.module.css';
import IconButton from '../IconButton';

export const toggleHeart = async (favoredId: string, user: any) => {
  const {userData, setUserData, toggleFavorite} = user;
  if (!userData) return;
  toggleFavorite(favoredId);
  const res = await fetch(`/api/next-stores/stores/${favoredId}/heart`);
  const json = await res.json();
  if (json.status === 'success') {
    setUserData(json.data);
  }
};
interface FavoriteTogglerProps {
  favoredId: string;
}

const FavoriteToggler = ({favoredId}: FavoriteTogglerProps) => {
  const user = useUser();
  const {userData} = user;
  const isFavored = userData?.favorites?.includes(favoredId);
  return (
    <IconButton
      clickHandler={() => toggleHeart(favoredId, user)}
      className={`${styles.heart} ${isFavored ? styles.favored : ''}`}
      icon={
        <Heart
          size={28}
          strokeWidth={1.2}
          fill={'currentColor'}
          stroke={
            isFavored ? 'hsla(0deg 0% 75% / 0.95)' : 'hsla(356 71% 40% / 0.95)'
          }
        />
      }
      animate={{color: isFavored ? 'hsl(356 71% 40%)' : 'hsl(0 0% 75%)'}}
      title={isFavored ? 'Remove from favorites' : 'Add to favorites'}
    >
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
    </IconButton>
  );
};

export default FavoriteToggler;
