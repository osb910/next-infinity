import {NextResponse} from 'next/server';
import Review, {type IReview} from '@/services/next-stores/review';
import Store, {type IStore} from '@/services/next-stores/store';
import {getModelQuery} from '@/services/lib';
import {type HydratedDocument} from 'mongoose';
import {type StoreRoute} from '../route';

export const POST: StoreRoute = async (req, {params}) => {
  const userId = req.headers.get('X-USER-ID');
  try {
    const {storeParam} = await params;
    const storeQuery = getModelQuery(storeParam);
    const store = (await Store.findOne(storeQuery)) as IStore;
    const {reviewText, rating} = await req.json();
    if (!rating || !reviewText) {
      console.log('no rating or review text');
      return NextResponse.json(
        {
          status: 'error',
          message: 'Please provide both a rating and a review text!',
          code: 400,
        },
        {status: 400}
      );
    }
    const review = new Review({
      author: userId,
      store: store._id?.toString(),
      text: reviewText,
      rating: +rating,
    });
    if (!review) {
      const err = new Error('Something went wrong!');
      throw err;
    }
    const res = (await review.save()) as HydratedDocument<IReview> & {
      _doc: IReview;
    };
    return NextResponse.json(
      {
        data: res._doc,
        status: 'success',
        message: 'Review saved!',
        code: 201,
      },
      {status: 201}
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
