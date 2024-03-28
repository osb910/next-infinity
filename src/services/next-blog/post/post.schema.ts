import {Schema} from 'mongoose';
import type {IPost, PostModel} from './post.types';
import User from '@/services/next-blog/user';

const postSchema = new Schema<IPost, PostModel>(
  {
    lang: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    abstract: String,
    file: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    readingTime: {
      minutes: Number,
      text: String,
      time: Number,
      words: Number,
    },
    slug: {
      type: String,
      required: true,
    },
    publishedOn: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tag',
      },
    ],
    by: String,
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    images: [
      {
        key: {
          type: String,
          required: true,
        },
        ogName: String,
        title: String,
        ogTitle: String,
        ext: {
          type: String,
          required: true,
        },
        mimeType: String,
        size: {
          type: Number,
          required: true,
        },
        readableSize: {
          type: String,
          required: true,
        },
        caption: String,
      },
    ],
    l10n: [
      {
        lang: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          trim: true,
          required: true,
        },
        abstract: String,
        file: {
          type: String,
          required: true,
        },
        body: {
          type: String,
          required: true,
        },
        readingTime: {
          minutes: Number,
          text: String,
          time: Number,
          words: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default postSchema;
