import {Model, Types} from 'mongoose';

export interface IReview {
  _id?: Types.ObjectId;
  author: Types.ObjectId;
  store: Types.ObjectId;
  text: string;
  rating?: number;
}

export type ReviewModel = Model<IReview>;
