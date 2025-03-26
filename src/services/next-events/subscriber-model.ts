import {Schema, type Model, connection} from 'mongoose';

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

const Subscriber = (db.models.Subscriber ||
  db.model('Subscriber', subscriberSchema)) as Model<Subscriber>;

export default Subscriber;
