import {NextRequest, NextResponse} from 'next/server';
import Subscriber from '@/services/next-events/subscriber-model';
import {isEmail} from '@/utils/validators';

export const POST = async (req: NextRequest) => {
  try {
    const {email} = await req.json();
    if (!isEmail(email)) {
      return NextResponse.json(
        {status: 'warning', message: 'Invalid email address.'},
        {status: 422}
      );
    }
    const subscriber = new Subscriber({email});
    const res = await subscriber.save();
    return NextResponse.json(
      {
        status: 'success',
        message: `${res.email} has subscribed to the newsletter.`,
      },
      {status: 201}
    );
  } catch (err) {
    if (!(err instanceof Error)) return;
    if (err.message.includes('duplicate key error')) {
      return NextResponse.json(
        {
          status: 'notice',
          // @ts-expect-error - mongo error
          message: `${err.keyValue.email} is already subscribed to the newsletter.`,
        },
        {status: 409}
      );
    }
    return NextResponse.json(
      {status: 'error', message: 'Inserting data failed.'},
      {status: 500}
    );
  }
};
