'use client';

import {useState, useEffect, type ReactElement} from 'react';
import ky from 'ky';
import {Trash2} from 'react-feather';
import useUser from './useUser';
import styles from './Eraser.module.css';
import IconButton from '../../ui/IconButton';
import Spinner from '../../ui/Spinner';
import {useToaster} from '@/ui/Toaster';

interface EraserProps {
  itemId: string;
  endpoint: string;
  icon?: ReactElement;
  confirmationText?: string;
  itemSelector?: string;
  removeItem?: () => void;
}

const Eraser = ({
  itemId,
  endpoint,
  icon,
  confirmationText,
  itemSelector,
  removeItem,
}: EraserProps) => {
  const {userData, toggleFavorite} = useUser();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const {createToast} = useToaster();
  useEffect(() => {
    if (!isDeleted) return;

    const item = document.querySelector(
      itemSelector ?? `[data-item="${itemId}"]`
    );
    item?.classList.add(styles.disappearing);

    const timeout = setTimeout(
      () => (removeItem ? removeItem() : item?.remove()),
      600
    );

    return () => clearTimeout(timeout);
  }, [isDeleted, itemId, itemSelector, removeItem]);

  const deleteItem = async () => {
    const confirmed = confirm(
      confirmationText ?? 'Are you sure you want to delete this item?'
    );
    if (!confirmed) return;

    setIsDeleting(true);
    try {
      const json = (await ky.delete(endpoint).json()) as {
        status: 'success' | 'warning' | 'error' | 'notice';
        message: string;
        data: any;
      };

      if (json.status === 'success') {
        setIsDeleted(true);
        const isFavored = userData?.favorites?.includes(itemId);
        if (isFavored) toggleFavorite(itemId);
      } else if (json.status === 'error') {
        throw new Error(json.message);
      } else {
        createToast(json.status, <p>{json.message}</p>, 5000);
      }
    } catch (err) {
      if (!(err instanceof Error)) return;
      createToast('error', <p>{err.message}</p>, 5000);
    }
    setIsDeleting(false);
  };

  return (
    <IconButton
      icon={
        isDeleting ? (
          <Spinner />
        ) : (
          icon ?? (
            <Trash2
              size={28}
              strokeWidth={1.2}
              fill='currentColor'
              stroke='hsl(356 71% 40%)'
            />
          )
        )
      }
      className={styles.button}
      onClick={deleteItem}
      disabled={isDeleting}
      title='Delete'
      aria-label='Delete'
    />
  );
};

export default Eraser;
