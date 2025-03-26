import type {Document, Model, Types} from 'mongoose';

export interface CategoryBase {
  lang: string;
  name: string;
  description?: string;
}
export interface ICategory extends Document<Types.ObjectId>, CategoryBase {
  slug: string;
  posts: Array<Types.ObjectId>;
  l10n: Array<CategoryBase>;
}

export type CategoryModel = Model<ICategory>;
