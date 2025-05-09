import {NextResponse} from 'next/server';
import Review, {type IReview} from '@/services/next-stores/review';
import {type StoreRoute} from '../../route';
import {nextDBConnect} from '@/lib/db';

type ReviewRoute = StoreRoute<{reviewId: string}>;

export const PUT: ReviewRoute = async (req, {params}) => {
  const userId = req.headers.get('X-USER-ID');
  try {
    await nextDBConnect();
    const {reviewId} = await params;
    const {reviewText, rating} = await req.json();
    if (!reviewText && !rating) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Please provide either a rating or a review text!',
          code: 400,
        },
        {status: 400}
      );
    }
    const res = (await Review.findOneAndUpdate(
      {
        _id: reviewId,
        author: userId,
      },
      {text: reviewText, rating},
      {new: true}
    )) as IReview;
    if (!res) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'You are not the author of this review!',
          code: 401,
        },
        {status: 401}
      );
    }
    return NextResponse.json(
      {
        status: 'success',
        code: 200,
        message: 'Review updated!',
        data: res,
      },
      {status: 200}
    );
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err);
    return NextResponse.json(
      {status: 'error', message: err.message, code: 500},
      {status: 500}
    );
  }
};

export const DELETE: ReviewRoute = async (req, {params}) => {
  const userId = req.headers.get('X-USER-ID');
  try {
    const {reviewId} = await params;
    const res = (await Review.findOneAndDelete({
      _id: reviewId,
      author: userId,
    })) as IReview;
    if (!res) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'You are not the author of this review!',
          code: 401,
        },
        {status: 401}
      );
    }
    return NextResponse.json(
      {
        status: 'success',
        code: 200,
        message: 'Review deleted!',
        data: res,
      },
      {status: 200}
    );
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err);
    return NextResponse.json(
      {status: 'error', message: err.message, code: 500},
      {status: 500}
    );
  }
};
