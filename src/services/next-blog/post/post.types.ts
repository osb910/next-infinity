import type {Img, P8n} from '@/types';
import type {Document, Model, Types} from 'mongoose';
import type {IComment} from '../comment';

export interface IPost extends Document {
  title: string;
  slug: string;
  abstract: string;
  publishedOn: Date;
  lang: string;
  file: string;
  content: string;
  by?: string;
  author: Types.ObjectId;
  tags: Array<Types.ObjectId>;
  likedBy: Array<Types.ObjectId>;
  comments: Array<Types.ObjectId>;
  images: Array<Img>;
  l10n?: Array<{
    lang: string;
    title: string;
    abstract: string;
    file: string;
    content: string;
    translatedBy?: string;
  }>;
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
  }) => Promise<
    {
      data: Array<IPostWithComments>;
      status: string;
      message: string;
      code: number;
    } & P8n
  >;
  getTagsList: () => Promise<Array<{_id: string; count: number}>>;
  getTopPosts: (
    page?: number | string | null,
    limit?: number | string | null
  ) => Promise<
    {
      data: Array<IPost>;
      status: string;
      message: string;
      code: number;
    } & P8n
  >;
}

export interface PostModel extends Model<IPost>, IPostStatics {}
