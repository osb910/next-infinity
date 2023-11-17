import Image from 'next/image';
import moment from 'moment';
import styles from './Review.module.css';
import {IReview} from '@/entities/next-stores/review/review.types';
import {IUser} from '@/entities/next-stores/user/user.model';
import Eraser from '../Eraser';

interface ReviewProps {
  review: IReview & {author: IUser; updatedAt: string};
  userId: string;
  removeReview: () => void;
}

const Review = ({review, removeReview, userId}: ReviewProps) => {
  return (
    <li className={styles.review} data-item={review._id}>
      <header className={styles.reviewHeader}>
        <p className={styles.reviewAuthor}>
          <Image
            src={review.author.gravatar || '/uploads/avatar.png'}
            width={96}
            height={96}
            alt={`Avatar of ${review.author.name}`}
            className={styles.avatar}
          />
          <span>{review.author.name}</span>
        </p>
        <p
          className={styles.reviewRating}
          title={`Rated ${review.rating} out of 5 stars`}
        >
          <span>
            {'\u2605'.repeat(review.rating || 0)}
            {'\u2606'.repeat(5 - (review.rating || 0))}{' '}
          </span>
          <span>({review.rating}/5)</span>
        </p>
        <time dateTime={review.updatedAt} className={styles.reviewTime}>
          {moment(review.updatedAt).fromNow()}
        </time>
      </header>
      <section className={styles.reviewBody}>
        <p className={styles.reviewText}>{review.text}</p>
        {userId === review.author._id && (
          <Eraser
            itemId={review._id?.toString() ?? ''}
            endpoint={`/api/next-stores/stores/${review.store}/reviews/${review._id}`}
            removeItem={removeReview}
          />
        )}
      </section>
    </li>
  );
};

export default Review;
