import type {Document, Model, Types} from 'mongoose';

export interface CommentBase {
  author: Types.ObjectId | string;
  body: string;
  likedBy: Array<Types.ObjectId | string>;
}

export interface IComment extends Document<Types.ObjectId> {
  post: Types.ObjectId | string;
  replies: Array<CommentBase>;
}

export type CommentModel = Model<IComment>;
