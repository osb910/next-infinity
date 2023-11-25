'use client';

import Image from 'next/image';
import {useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import moment from 'moment';
import ky from 'ky';
import {Edit} from 'react-feather';
import {IReview} from '@/entities/next-stores/review/review.types';
import {IUser} from '@/entities/next-stores/user/user.model';
import useToaster from '@/components/Toaster/use-toaster';
import Eraser from '../Eraser';
import RatingStars from '@/components/RatingStars';
import Form from '@/components/Form';
import IconButton from '@/components/IconButton';
import styles from './Review.module.css';

interface ReviewProps {
  review: IReview & {author: IUser; updatedAt: string};
  userId: string;
  editReview: (review: IReview) => void;
  removeReview: () => void;
}

const Review = ({review, editReview, removeReview, userId}: ReviewProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const {createToast} = useToaster();
  const [reviewTime, setReviewTime] = useState(
    moment(review.updatedAt).fromNow()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setReviewTime(moment(review.updatedAt).fromNow());
    }, 60000);
    return () => clearInterval(interval);
  }, [review.updatedAt]);

  const updateReview = async (body: FormData) => {
    if (
      body.get('reviewText') === review.text &&
      +(body.get('rating') ?? '') === review.rating
    ) {
      setIsEditing(false);
      return;
    }
    const json = (await ky
      .put(`/api/next-stores/stores/${review.store}/reviews/${review._id}`, {
        json: Object.fromEntries(body.entries()),
        headers: {
          'X-USER-ID': userId,
        },
        throwHttpErrors: false,
      })
      .json()) as {
      status: 'success' | 'warning' | 'error' | 'notice';
      message: string;
      data: any;
    };
    if (json.status === 'success') {
      editReview(json.data);
      setIsEdited(true);
    } else if (json.status === 'error') {
      throw new Error(json.message);
    } else {
      createToast(json.status, <p>{json.message}</p>, 5000);
    }
    setIsEditing(false);
  };

  const throwError = (err: Error) =>
    createToast('error', <p>{err.message}</p>, 5000);

  return (
    <motion.li
      className={styles.review}
      data-item={review._id}
      key={+isEdited}
      initial={{
        scale: 0.8,
        opacity: 0.6,
      }}
      animate={{
        scale: 1,
        opacity: 1,
        ...(isEdited && {
          scale: [1, 1.05, 1],
          boxShadow: '0 0 1px 2px rgba(20, 220, 20, 0.6)',
          border: '1px solid rgba(20, 220, 20, 0.6)',
        }),
      }}
      transition={{duration: 0.8}}
    >
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
          {reviewTime}
        </time>
      </header>
      <section className={styles.reviewBody}>
        {isEditing ? (
          <Form
            submitHandler={updateReview}
            errorHandler={throwError}
            submitText='Save'
            className={styles.reviewEditForm}
          >
            <p className={styles.reviewText}>
              <label htmlFor='review'>Edit review</label>
              <textarea
                id='review'
                name='reviewText'
                rows={2}
                placeholder='Did you try this place? Have something to say? Leave a review...'
                defaultValue={review.text}
              />
            </p>
            <RatingStars selectedRating={review.rating} />
            <button type='button' onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </Form>
        ) : (
          <>
            <p className={styles.reviewText}>{review.text}</p>
            {userId === review.author._id && (
              <>
                <IconButton
                  clickHandler={() => setIsEditing(true)}
                  icon={<Edit fill='var(--color-gray-900)' size={28} />}
                  className={styles.editButton}
                  title='Edit review'
                  aria-label='Edit review'
                  style={{color: 'hsl(220, 90%, 40%)'}}
                />
                <Eraser
                  itemId={review._id?.toString() ?? ''}
                  endpoint={`/api/next-stores/stores/${review.store}/reviews/${review._id}`}
                  removeItem={removeReview}
                />
              </>
            )}
          </>
        )}
      </section>
    </motion.li>
  );
};

export default Review;
