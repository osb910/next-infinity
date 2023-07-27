import {NextRequest, NextResponse} from 'next/server';
import User, {IUser} from '@/entities/next-stores/user/user.model';
import {HydratedDocument} from 'mongoose';

export const GET = async (req: NextRequest) => {
  const userId = req.headers.get('X-USER-ID');
  if (!userId)
    return NextResponse.json(
      {status: 'error', message: 'No user id'},
      {status: 401}
    );
  try {
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
