import type {Document, Model, Types} from 'mongoose';

export interface TagBase {
  lang: string;
  name: string;
  description?: string;
}
export interface ITag extends Document<Types.ObjectId>, TagBase {
  slug: string;
  posts: Array<Types.ObjectId | string>;
  l10n: Array<TagBase>;
}

export type TagModel = Model<ITag>;
