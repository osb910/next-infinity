import {Schema, Model, connection} from 'mongoose';
import {IReview, ReviewModel} from './review.types';

const db = connection.useDb('next-stores');

const reviewSchema = new Schema<IReview, ReviewModel>(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide an author'],
    },
    store: {
      type: Schema.Types.ObjectId,
      ref: 'Store',
      required: [true, 'Please provide a store'],
    },
    text: {
      type: String,
      required: [true, 'Please provide a text'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    photo: {
      title: String,
      ext: String,
      mimeType: String,
      size: Number,
      readableSize: String,
      key: String,
    },
  },
  {timestamps: true}
);

const Review =
  (db.models.Review as Model<IReview, ReviewModel>) ||
  db.model('Store', reviewSchema);

export default Review;
