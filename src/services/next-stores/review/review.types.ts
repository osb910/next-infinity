import {Document, type Model, type Types} from 'mongoose';
import {type IUser} from '../user';

export interface IReview extends Document<Types.ObjectId> {
  author: Types.ObjectId | IUser;
  store: Types.ObjectId;
  text: string;
  rating?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ReviewModel = Model<IReview>;
