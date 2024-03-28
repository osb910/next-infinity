import type {Document, Model, Types} from 'mongoose';

export interface CommentBase {
  author: Types.ObjectId;
  body: string;
  likedBy: Array<Types.ObjectId>;
}

export interface IComment extends Document {
  post: Types.ObjectId;
  replies: Array<CommentBase>;
}

export interface CommentModel extends Model<IComment> {}
