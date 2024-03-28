import type {Document, Model, Types} from 'mongoose';

export interface TagBase {
  lang: string;
  name: string;
  description?: string;
}
export interface ITag extends Document, TagBase {
  slug: string;
  posts: Array<Types.ObjectId>;
  l10n: Array<TagBase>;
}

export interface TagModel extends Model<ITag> {}
