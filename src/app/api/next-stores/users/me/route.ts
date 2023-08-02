import {NextRequest, NextResponse} from 'next/server';
import User, {IUser} from '@/entities/next-stores/user/user.model';
import {HydratedDocument} from 'mongoose';

export const dynamic = 'force-dynamic';

export const GET = async (req: NextRequest) => {
  try {
    const userId = req.headers.get('X-USER-ID');
    if (!userId)
      return NextResponse.json(
        {status: 'error', message: 'No user id'},
        {status: 401}
      );
    const user = (await User.findById(userId)) as HydratedDocument<IUser> & {
      _doc: HydratedDocument<IUser>;
    };
    return NextResponse.json(
      {
        status: 'success',
        message: `Successfully fetched user!`,
        data: user._doc,
      },
      {status: 200, headers: {'Content-Type': 'application/json'}}
    );
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err);
    return NextResponse.json({status: 'error', message: err.message});
  }
};

export const PUT = async (req: NextRequest) => {
  const userId = req.headers.get('X-USER-ID');
  if (!userId)
    return NextResponse.json(
      {status: 'error', message: 'No user id'},
      {status: 401}
    );
  try {
    const {name, email} = await req.json();
    const update = {name, email};
    const user = (await User.findByIdAndUpdate(userId, update, {
      new: true,
      runValidators: true,
    })) as HydratedDocument<IUser> & {
      _doc: HydratedDocument<IUser>;
    };
    return NextResponse.json(
      {
        status: 'success',
        message: `Successfully updated user!`,
        data: user._doc,
      },
      {status: 200, headers: {'Content-Type': 'application/json'}}
    );
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err);
    return NextResponse.json(
      {status: 'error', message: err.message},
      {status: 500}
    );
  }
};
