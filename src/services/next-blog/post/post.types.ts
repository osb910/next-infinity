import type {Document, Model, Types} from 'mongoose';
import type {Img, JsonRes} from '@/types';
import type {IComment} from '../comment';

export interface PostBase {
  lang: string;
  title: string;
  abstract: string;
  file: string;
  content: string;
}

export interface IPost extends Document, PostBase {
  slug: string;
  publishedOn: Date;
  isFeatured: boolean;
  by?: string;
  author: Types.ObjectId;
  tags: Array<Types.ObjectId>;
  likedBy: Array<Types.ObjectId>;
  comments: Array<Types.ObjectId>;
  images: Array<Img>;
  l10n: Array<
    PostBase & {
      translatedBy?: string;
    }
  >;
}

export interface IPostWithComments extends Omit<IPost, 'comments'> {
  comments: Array<IComment>;
}

export interface IPostStatics {
  findWithComments: ({
    page,
    limit,
    query,
  }: {
    page: string | number | null;
    limit: string | number | null;
    query?: any | null;
    extraPipeline?: any | null;
  }) => Promise<JsonRes<Array<IPostWithComments>>>;
  getTagsList: () => Promise<Array<{_id: string; count: number}>>;
  getTopPosts: (
    page?: number | string | null,
    limit?: number | string | null
  ) => Promise<JsonRes<Array<IPost>>>;
}

export interface PostModel extends Model<IPost>, IPostStatics {}
