import {
  Schema,
  type Model,
  type Types,
  connection,
  type Document,
} from 'mongoose';

export interface IEvent extends Document<Types.ObjectId> {
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isFeatured: boolean;
  comments: Types.ObjectId[];
}

export type EventModel = Model<IEvent>;

const db = connection.useDb('next-events');

const eventSchema = new Schema<IEvent, EventModel>(
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
  {
    toJSON: {virtuals: true},
    toObject: {virtuals: true},
    timestamps: true,
  }
);

const Event = (db.models.Event || db.model('Event', eventSchema)) as EventModel;

export default Event;
