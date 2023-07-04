import mongoose, {Schema, model} from 'mongoose';

export type Event = {
  id: string;
  _id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isFeatured: boolean;
};

const eventSchema = new Schema<Event>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    require: true,
  },
  location: {
    type: String,
    require: true,
  },
  date: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  isFeatured: {
    type: Boolean,
    require: true,
  },
});

// export default mongoose.models && 'Event' in mongoose.models
//   ? (mongoose.models.Event as mongoose.Model<Event>)
//   : mongoose.model<Event>('Event', eventSchema);

export default (mongoose.models?.Event as mongoose.Model<Event>) ||
  model<Event>('Event', eventSchema);
