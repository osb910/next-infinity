import type {Document, Model, Types} from 'mongoose';

export interface IComment extends Document {
  author: Types.ObjectId;
  post: Types.ObjectId;
  content: string;
  likedBy: Array<Types.ObjectId>;
  replies: Array<IComment>;
}

export type CommentModel = Model<IComment>;
