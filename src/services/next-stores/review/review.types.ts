import {type Model, type Types} from 'mongoose';
import {type IUser} from '../user';
import {DocResult} from '@/types';

export interface IReview extends DocResult<IReview> {
  author: Types.ObjectId | IUser;
  store: Types.ObjectId;
  text: string;
  rating?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ReviewModel = Model<IReview>;
