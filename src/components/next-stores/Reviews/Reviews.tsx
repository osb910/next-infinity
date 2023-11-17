'use client';

import {useState} from 'react';
import useUser from '../useUser';
import Review from '../Review';
import ReviewForm from '../ReviewForm';
import styles from './Reviews.module.css';

interface ReviewsProps {
  reviews: Array<any>;
  endpoint: string;
}

const Reviews = ({reviews, endpoint}: ReviewsProps) => {
  const [reviewList, setReviewList] = useState(reviews);
  const {userData} = useUser();
  return (
    <>
      <ReviewForm
        user={userData}
        endpoint={endpoint}
        addReview={review => {
          setReviewList(current => [review, ...current]);
        }}
      />
      <ul className={styles.reviews}>
        {reviewList.map(review => (
          <Review
            key={review._id}
            review={review}
            userId={userData?._id ?? ''}
            removeReview={() => {
              setReviewList(current =>
                current.filter(item => item._id !== review._id)
              );
            }}
          />
        ))}
      </ul>
    </>
  );
};

export default Reviews;
