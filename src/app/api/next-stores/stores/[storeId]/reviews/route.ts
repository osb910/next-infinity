import {NextRequest, NextResponse} from 'next/server';
import Review from '@/entities/next-stores/review';
import {IReview} from '@/entities/next-stores/review/review.types';
import Store, {IStore} from '@/entities/next-stores/store/store.model';
import {HydratedDocument} from 'mongoose';
import {getModelQuery} from '@/entities/models.middleware';
import {Params} from '../route';

export const GET = async (req: NextRequest, {params: {storeId}}: Params) => {
  const storeQuery = getModelQuery(storeId);
  try {
    const store = (await Store.findOne(storeQuery)) as IStore & {
      _doc: IStore;
    };
    if (!store) {
      return NextResponse.json(
        {
          status: 'error',
          message: `No store found with id or slug ${storeId}`,
          code: 404,
        },
        {status: 404}
      );
    }
    const reviews = (await Review.find({
      store: store._id,
    })) as Array<HydratedDocument<IReview>>;

    return NextResponse.json(
      {
        ...store._doc,
        reviews,
        status: 'success',
        message: `Successfully fetched ${store.name}!`,
        code: 200,
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

export const POST = async (req: NextRequest, {params: {storeId}}: Params) => {
  const userId = req.headers.get('X-USER-ID');
  const storeQuery = getModelQuery(storeId);
  try {
    const store = (await Store.findOne(storeQuery)) as IStore;
    const {reviewText, rating} = await req.json();
    if (!rating || !reviewText) {
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
