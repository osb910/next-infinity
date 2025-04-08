'use client';

import {motion, LayoutGroup} from 'framer-motion';
import styles from './CommentList.module.css';
import {Comment} from './NewComment';
import {useId} from 'react';
import {AR_REGEX} from '@/lib/text/regex/ar-regex';

const CommentList = ({comments}: {comments: Comment[]}) => {
  const layoutId = `comments${useId()}`;
  return (
    <LayoutGroup>
      <ul
        dir='auto'
        className={styles.comments}
      >
        {comments.map((comment) => (
          <motion.li
            key={comment._id}
            layoutId={layoutId + comment._id}
            transition={{
              type: 'spring',
              damping: 12,
              stiffness: 100,
              restDelta: 0.01,
            }}
          >
            <p
              dir='auto'
              className={AR_REGEX.anyChar.test(comment.comment) ? 'rtl' : ''}
            >
              {comment.comment}
            </p>
            <div>
              By{' '}
              <address
                className={AR_REGEX.anyChar.test(comment.author) ? 'rtl' : ''}
              >
                {comment.author}
              </address>
            </div>
          </motion.li>
        ))}
      </ul>
    </LayoutGroup>
  );
};

export default CommentList;
