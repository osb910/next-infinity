import {NextRequest, NextResponse} from 'next/server';
import User, {IUser} from '@/entities/next-stores/user/user.model';
import {Params} from '../route';
import {HydratedDocument} from 'mongoose';

export const GET = async (req: NextRequest, {params: {storeId}}: Params) => {
  const userId = req.headers.get('X-USER-ID');
  try {
    const user = (await User.findById(userId)) as HydratedDocument<IUser> & {
      _doc: IUser;
    };
    if (!user) {
      return NextResponse.json(
        {status: 'error', message: 'User not found!'},
        {status: 404}
      );
    }
    const isFavorite = user.favorites.includes(storeId);
    const updatedUser = await User.findByIdAndUpdate(
      user._id.toString(),
      {[isFavorite ? '$pull' : '$addToSet']: {favorites: storeId}},
      {
        projection: {password: 0, __v: 0},
        new: true,
      }
    );
    if (!updatedUser) {
      return NextResponse.json(
        {status: 'error', message: 'User not found!'},
        {status: 404}
      );
    }
    return NextResponse.json({
      status: 'success',
      data: updatedUser,
      message: `Store ${isFavorite ? 'removed from' : 'added to'} favorites!`,
    });
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err);
    return NextResponse.json(
      {status: 'error', message: err.message},
      {status: 500}
    );
  }
};
