import type {Model, Document, Types} from 'mongoose';

export interface IMessage extends Document<Types.ObjectId> {
  email: string;
  name: string;
  body: string;
}

export type MessageModel = Model<IMessage>;
