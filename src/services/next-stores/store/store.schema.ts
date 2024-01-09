import {Schema} from 'mongoose';
import type {IStore, StoreModel} from './store.types';
import User from '@/services/next-stores/user';

const storeSchema = new Schema<IStore, StoreModel>(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please enter a store name!'],
    },
    slug: String,
    description: {
      type: String,
      trim: true,
    },
    tags: [String],
    location: {
      type: {
        type: String,
        default: 'Point',
      },
      coordinates: [
        {
          type: Number,
          required: [true, 'You must supply coordinates!'],
        },
      ],
      address: {
        type: String,
        required: [true, 'You must supply an address'],
      },
    },
    photo: {
      key: String,
      etag: String,
      title: String,
      ext: String,
      mimeType: String,
      size: Number,
      readableSize: String,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: User,
      required: [true, 'You must supply an author'],
    },
  },
  {
    timestamps: true,
  }
);

export default storeSchema;
