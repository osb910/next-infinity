import {Schema, connection} from 'mongoose';
import type {IReview, ReviewModel} from './review.types';
import User from '../user';

const db = connection.useDb('next-stores');

const reviewSchema = new Schema<IReview, ReviewModel>(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: User,
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
  },
  {timestamps: true}
);

reviewSchema.index({rating: 1});

const Review = (db.models.Review ||
  db.model('Review', reviewSchema)) as ReviewModel;

export default Review;
