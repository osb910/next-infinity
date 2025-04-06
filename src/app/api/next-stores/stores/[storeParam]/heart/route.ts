import {NextResponse} from 'next/server';
import User, {type IUser} from '@/services/next-stores/user';
import {type StoreRoute} from '../route';
import type {HDoc} from '@/types';
import {nextDBConnect} from '@/lib/db';

export const GET: StoreRoute = async (req, {params}) => {
  const userId = req.headers.get('X-USER-ID');
  try {
    await nextDBConnect();
    const {storeParam} = await params;
    const user = (await User.findById(userId)) as HDoc<IUser>;
    if (!user) {
      return NextResponse.json(
        {status: 'error', message: 'User not found!'},
        {status: 404}
      );
    }
    const isFavorite = user.favorites.includes(storeParam);
    const updatedUser = await User.findByIdAndUpdate(
      user._id.toString(),
      {[isFavorite ? '$pull' : '$addToSet']: {favorites: storeParam}},
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
