import type {Model, Types, Document} from 'mongoose';
import type {P8n} from '@/types';
import type {IReview} from '../review';

export interface IStore extends Document<Types.ObjectId> {
  name: string;
  slug: string;
  description: string;
  tags: string[];
  location: {
    type: string;
    coordinates: number[];
    address: string;
  };
  photo?: {
    key: string;
    title: string;
    ext: string;
    mimeType: string;
    size: number;
    readableSize: string;
  };
  author: Types.ObjectId;
}

export interface IStoreWithReviews extends IStore {
  reviews: Array<IReview>;
}

export interface IStoreStatics {
  findWithReviews: ({
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
      data: Array<IStoreWithReviews>;
      status: string;
      message: string;
      code: number;
    } & P8n
  >;
  getTagsList: () => Promise<Array<{_id: string; count: number}>>;
  getTopStores: (
    page?: number | string | null,
    limit?: number | string | null
  ) => Promise<
    {
      data: Array<IStore>;
      status: string;
      message: string;
      code: number;
    } & P8n
  >;
}

export interface StoreModel extends Model<IStore>, IStoreStatics {}
