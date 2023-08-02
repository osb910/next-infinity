import {Schema, Model, Types, connection} from 'mongoose';

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

const db = connection.useDb('next-events', {useCache: true});

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

export default (db.models.Event as Model<IEvent>) ||
  db.model('Event', eventSchema);
