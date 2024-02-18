import type {Document, Model, Types} from 'mongoose';

export interface ITag extends Document {
  name: string;
  lang: string;
  posts: Array<Types.ObjectId>;
  l10n: Array<{
    lang: string;
    name: string;
  }>;
}

export interface TagModel extends Model<ITag> {}
