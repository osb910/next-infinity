import {NextRequest, NextResponse} from 'next/server';
import Event from '@/app/next-events/Event.model';
import {isEmail} from '@/utils/validators';

export const PUT = async (
  req: NextRequest,
  {params}: {params: {event: string}}
) => {
  try {
    const body = await req.json();
    const {author, email, comment} = body;
    if (
      !email ||
      !isEmail(email) ||
      !author ||
      !author.trim() ||
      !comment ||
      !comment.trim()
    ) {
      return NextResponse.json(
        {
          status: 'warning',
          message: 'Invalid name, comment, or email address.',
        },
        {status: 422}
      );
    }
    const res = await Event.findByIdAndUpdate(params.event, {
      // alternative to unshift: adds to the beginning of the array
      $push: {comments: {$each: [body], $position: 0}},
    });

    if (!res) throw new Error('Inserting comment failed.');

    return NextResponse.json(
      {...body, status: 'success', message: 'Comment added!'},
      {status: 201}
    );
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err);
    return NextResponse.json(
      {
        status: 'error',
        message: err.message,
      },
      {status: 500}
    );
  }
};
