'use client';

import {useState, useEffect} from 'react';
import ky from 'ky';
import {Trash2} from 'react-feather';
import useUser from './useUser';
import styles from './Eraser.module.css';
import IconButton from '../IconButton';
import Spinner from '../Spinner';

interface EraserProps {
  itemId: string;
}

const Eraser = ({itemId}: EraserProps) => {
  const {userData, toggleFavorite} = useUser();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  useEffect(() => {
    if (!isDeleted) return;
    const item = document.querySelector(`[data-item="${itemId}"]`);
    item?.classList.add(styles.disappearing);
    const timeout = setTimeout(() => item?.remove(), 600);
    return () => clearTimeout(timeout);
  }, [isDeleted, itemId]);
  const deleteItem = async () => {
    const confirmed = confirm('Are you sure you want to delete this item?');
    if (!confirmed) return;
    setIsDeleting(true);
    const json = (await ky
      .delete(`/api/next-stores/stores/${itemId}`)
      .json()) as {
      status: string;
      data: any;
    };
    if (json.status === 'success') {
      setIsDeleting(false);
      setIsDeleted(true);
      const isFavored = userData?.favorites?.includes(itemId);
      isFavored && toggleFavorite(itemId);
    }
  };
  return (
    <IconButton
      clickHandler={deleteItem}
      className={styles.button}
      icon={
        isDeleting ? (
          <Spinner />
        ) : (
          <Trash2
            size={28}
            strokeWidth={1.2}
            fill='hsl(0 0% 75%)'
            stroke='hsl(356 71% 40%)'
          />
        )
      }
    />
  );
};

export default Eraser;
