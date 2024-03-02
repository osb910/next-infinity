import {Schema} from 'mongoose';
import type {IMessage, MessageModel} from './message.types';
import isEmail from 'validator/lib/isEmail';

const messageSchema = new Schema<IMessage, MessageModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate: [isEmail, 'Invalid Email Address'],
    },
    body: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default messageSchema;
