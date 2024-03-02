import type {Model, Document} from 'mongoose';

export interface IMessage extends Document {
  email: string;
  name: string;
  body: string;
}

export interface MessageModel extends Model<IMessage> {}
