'use client';

import {useRouter, usePathname} from 'next/navigation';
import ky from 'ky';
import Form, {type FormProps} from '@/components/Form';
import {useToaster} from '@/ui/Toaster';
import cls from './ReviewForm.module.css';
import RatingStars from '@/ui/RatingStars';
import {type IUser} from '@/services/next-stores/user';
import clsx from 'clsx';

interface ReviewFormProps extends FormProps {
  user: Omit<IUser, 'password'> | null;
  endpoint: string;
  addReview: (review: any) => void;
}

const ReviewForm = ({
  user,
  endpoint,
  children,
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
      throwErr={throwError}
      btnDisabled={!user}
      {...delegated}
      className={clsx(cls.reviewForm, delegated.className)}
    >
      <p className={cls.reviewText}>
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
        <p className={cls.loginText}>
          Not logged in.{' '}
          <button
            type='button'
            onClick={() => {
              router.replace(`${pathname}?dialog=login`);
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
