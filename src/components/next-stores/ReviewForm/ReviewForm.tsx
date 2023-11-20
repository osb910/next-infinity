'use client';

import {ReactNode, ComponentProps} from 'react';
import {useRouter, usePathname} from 'next/navigation';
import ky from 'ky';
import Form from '@/components/Form';
import useToaster from '@/components/Toaster/use-toaster';
import styles from './ReviewForm.module.css';
import RatingStars from '@/components/RatingStars';
import {IUser} from '@/entities/next-stores/user/user.model';

interface ReviewFormProps extends ComponentProps<'form'> {
  user: Omit<IUser, 'password'> | null;
  endpoint: string;
  addReview: (review: any) => void;
  children?: ReactNode;
  className?: string;
}

const ReviewForm = ({
  user,
  endpoint,
  children,
  className,
  addReview,
  ...delegated
}: ReviewFormProps) => {
  const {createToast} = useToaster();
  const router = useRouter();
  const pathname = usePathname();

  const submitReview = async (body: FormData) => {
    const json = (await ky
      .post(endpoint, {
        json: Object.fromEntries(body.entries()),
        headers: {
          'X-USER-ID': user?._id?.toString() ?? '',
        },
        timeout: 20000,
        throwHttpErrors: false,
      })
      .json()) as {
      status: 'success' | 'warning' | 'error' | 'notice';
      message: string;
      data: any;
    };

    if (json.status === 'success') {
      addReview({...json.data, author: user});
      createToast('success', <p>{json.message}</p>, 5000);
    } else if (json.status === 'error') {
      throw new Error(json.message);
    } else {
      createToast(json.status, <p>{json.message}</p>, 5000);
    }
  };

  const throwError = (err: Error) =>
    createToast('error', <p>{err.message}</p>, 5000);

  return (
    <Form
      submitHandler={submitReview}
      errorHandler={throwError}
      className={`${className ?? ''} ${styles.reviewForm}`}
      buttonDisabled={!user}
      {...delegated}
    >
      <p className={styles.reviewText}>
        <label htmlFor='review'>Type your review</label>
        <textarea
          id='review'
          name='reviewText'
          rows={2}
          placeholder='Did you try this place? Have something to say? Leave a review...'
          disabled={!user}
        />
      </p>
      <RatingStars disabled={!user} />
      {!user && (
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
