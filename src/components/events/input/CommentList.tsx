'use client';

import styles from './CommentList.module.css';
import {Comment} from './NewComment';

const CommentList = ({comments}: {comments: Comment[]}) => {
  return (
    <ul
      dir='auto'
      className={styles.comments}
    >
      {comments.map((comment) => (
        <li key={comment._id}>
          <p dir='auto'>{comment.comment}</p>
          <div>
            By <address>{comment.author}</address>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
