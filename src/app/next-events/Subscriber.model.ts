import {Schema, model, models, Model} from 'mongoose';
import {connectDBs} from '@/utils/database';

export type Subscriber = {
  email: string;
};

const subscriberSchema = new Schema<Subscriber>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {timestamps: true}
);

const {eventsDB} = await connectDBs();

export default (eventsDB.models?.Subscriber as Model<Subscriber>) ||
  eventsDB.model('Subscriber', subscriberSchema);
