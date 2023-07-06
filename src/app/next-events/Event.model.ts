import {Schema, model, models, Model, Types} from 'mongoose';

export type IEvent = {
  _id?: Types.ObjectId;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isFeatured: boolean;
  comments: Types.ObjectId[];
};

const eventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    isFeatured: {
      type: Boolean,
      required: true,
    },
    comments: [
      {
        comment: {
          type: String,
          required: true,
        },
        author: {
          type: String,
          required: true,
        },
        email: {
          type: String,
        },
      },
    ],
  },
  {timestamps: true}
);

export default (models?.Event as Model<IEvent>) ||
  model<IEvent>('Event', eventSchema);
