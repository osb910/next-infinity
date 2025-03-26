import type {Document, Model, Types} from 'mongoose';
import type {FileInfo, JsonRes} from '@/types';
import type {IComment} from '../comment';

export interface PostBase {
  lang: string;
  title: string;
  abstract?: string;
  file: string;
  body: string;
  readingTime: {
    minutes: number;
    text: string;
    time: number;
    words: number;
  };
}

export interface IPost extends PostBase, Document<Types.ObjectId> {
  slug: string;
  publishedOn: Date;
  status: 'draft' | 'published';
  isFeatured: boolean;
  author: Types.ObjectId | string;
  translator?: string;
  by?: string;
  category: Types.ObjectId | string;
  tags: Array<Types.ObjectId | string>;
  likes: Array<Types.ObjectId | string>;
  comments: Array<Types.ObjectId | string>;
  images: Array<FileInfo>;
  l10n: Array<PostBase>;
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
