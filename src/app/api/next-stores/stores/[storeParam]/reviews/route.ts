import {NextRequest, NextResponse} from 'next/server';
import Review from '@/services/next-stores/review';
import {IReview} from '@/services/next-stores/review/review.types';
import Store, {IStore} from '@/services/next-stores/store';
import {HydratedDocument} from 'mongoose';
import {getModelQuery} from '@/services/services.lib';
import {Params} from '../route';

export const POST = async (
  req: NextRequest,
  {params: {storeParam}}: Params
) => {
  const userId = req.headers.get('X-USER-ID');
  const storeQuery = getModelQuery(storeParam);
  try {
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
