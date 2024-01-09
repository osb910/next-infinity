import {NextRequest, NextResponse} from 'next/server';
import User, {type IUser} from '@/services/next-stores/user';
import {HydratedDocument} from 'mongoose';
import Store from '@/services/next-stores/store/store.model';

export const dynamic = 'force-dynamic';

export const GET = async (req: NextRequest) => {
  const userId = req.headers.get('X-USER-ID');
  if (!userId)
    return NextResponse.json(
      {status: 'error', message: 'No user id'},
      {status: 401}
    );
  const {searchParams} = req.nextUrl;
  const populateFavorites = searchParams.get('populateFavorites') === 'true';
  try {
    let user = (await User.findById(
      userId,
      '-password -resetPasswordToken -resetPasswordExpires -__v'
    )) as
      | any
      | (HydratedDocument<IUser> & {
          _doc: IUser;
          gravatar: Promise<string>;
        });
    if (!user) {
      return NextResponse.json(
        {status: 'error', error: 'User not found!', code: 404},
        {status: 404}
      );
    }
    user = {
      ...user._doc,
      favorites: populateFavorites
        ? await Store.find({_id: {$in: user.favorites}})
        : user.favorites,
      gravatar: await user.gravatar,
    };
    return NextResponse.json(
      {
        status: 'success',
        code: 200,
        message: `Successfully fetched user!`,
        data: user,
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
