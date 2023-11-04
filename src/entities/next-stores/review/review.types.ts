import {Model, Types} from 'mongoose';

export interface IReview {
  _id?: Types.ObjectId;
  author: Types.ObjectId;
  store: Types.ObjectId;
  text: string;
  rating?: number;
  photo?: {
    title: string;
    ext: string;
    mimeType: string;
    size: number;
    readableSize: string;
    key: string;
  };
}

export type ReviewModel = Model<IReview>;
