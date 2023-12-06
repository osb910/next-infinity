import {Model, Types} from 'mongoose';
import {IUser} from '../user/user.model';

export interface IReview {
  _id?: Types.ObjectId;
  author: Types.ObjectId | IUser;
  store: Types.ObjectId;
  text: string;
  rating?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IReviewMethods {}

export type ReviewModel = Model<IReview, {}, IReviewMethods>;
