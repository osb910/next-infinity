'use client';

import {ReactNode, ComponentProps} from 'react';
import {useRouter, usePathname} from 'next/navigation';
import ky from 'ky';
import Form from '@/components/Form';
import useToaster from '@/components/Toaster/use-toaster';
import styles from './ReviewForm.module.css';
import RatingStars from '@/components/RatingStars';

interface ReviewFormProps extends ComponentProps<'form'> {
  userId: string;
  endpoint: string;
  children?: ReactNode;
  className?: string;
}

const ReviewForm = ({
  userId,
  endpoint,
  children,
  className,
  ...delegated
}: ReviewFormProps) => {
  const {createToast} = useToaster();
  const router = useRouter();
  const pathname = usePathname();

  const submitReview = async (body: FormData) => {
    const res = await ky.post(endpoint, {
      json: Object.fromEntries(body.entries()),
      headers: {
        'X-USER-ID': userId,
      },
      timeout: 20000,
    });
    const json = (await res.json()) as {
      status: 'success' | 'warning' | 'error' | 'notice';
      message: string;
    };

    console.log(json);
    createToast(json.status, <p>{json.message}</p>, 5000);
  };

  return (
    <Form
      submitHandler={submitReview}
      className={`${className ?? ''} ${styles.reviewForm}`}
      buttonDisabled={!userId}
      {...delegated}
    >
      <p className={styles.reviewText}>
        <label htmlFor='review'>Type your review</label>
        <textarea
          id='review'
          name='reviewText'
          rows={2}
          placeholder='Did you try this place? Have something to say? Leave a review...'
          disabled={!userId}
        />
      </p>
      <RatingStars disabled={!userId} />
      {!userId && (
        <p className={styles.loginText}>
          Not logged in.{' '}
          <button
            type='button'
            onClick={() => {
              router.replace(`${pathname}?sub-page=login`);
            }}
          >
            Login
          </button>{' '}
          to leave a review.
        </p>
      )}
      {children}
    </Form>
  );
};

export default ReviewForm;
