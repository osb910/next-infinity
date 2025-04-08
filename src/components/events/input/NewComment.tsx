'use client';

import styles from './NewComment.module.css';
import Spinner from '@/ui/Spinner';

export type Comment = {
  _id?: string;
  email: string;
  author: string;
  comment: string;
};

const NewComment = ({
  onAddComment,
  isPending,
}: {
  onAddComment: (commentData: FormData) => void;
  isPending?: boolean;
}) => {
  return (
    <form
      className={styles.form}
      action={onAddComment}
    >
      <div className={styles.row}>
        <p className={styles.control}>
          <label htmlFor='email'>Your email</label>
          <input
            type='email'
            id='email'
            name='email'
          />
        </p>
        <p className={styles.control}>
          <label htmlFor='author'>Your name</label>
          <input
            dir='auto'
            type='text'
            id='author'
            name='author'
          />
        </p>
      </div>
      <p className={styles.control}>
        <label htmlFor='comment'>Your comment</label>
        <textarea
          dir='auto'
          id='comment'
          name='comment'
          rows={5}
        ></textarea>
      </p>
      <button disabled={isPending}>Submit {isPending && <Spinner />}</button>
    </form>
  );
};

export default NewComment;
