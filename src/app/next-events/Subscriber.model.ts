import {Schema, model, models, Model} from 'mongoose';

export type Subscriber = {
  email: string;
};

const subscriberSchema = new Schema<Subscriber>(
  {
    email: {
      type: String,
      required: true,
    },
  },
  {timestamps: true}
);

export default (models?.Subscriber as Model<Subscriber>) ||
  model<Subscriber>('Subscriber', subscriberSchema);
