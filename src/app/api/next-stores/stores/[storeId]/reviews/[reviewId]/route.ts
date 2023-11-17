import {NextRequest, NextResponse} from 'next/server';
import Review from '@/entities/next-stores/review';
import {IReview} from '@/entities/next-stores/review/review.types';

export type Params = {
  params: {
    storeId: string;
    reviewId: string;
  };
};

export const DELETE = async (
  req: NextRequest,
  {params: {reviewId}}: Params
) => {
  const userId = req.headers.get('X-USER-ID');
  try {
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
