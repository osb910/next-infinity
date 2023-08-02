import {Schema, Model, connection} from 'mongoose';

export type Subscriber = {
  email: string;
};

const db = connection.useDb('next-events', {useCache: true});

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

export default (db.models.Subscriber as Model<Subscriber>) ||
  db.model('Subscriber', subscriberSchema);
