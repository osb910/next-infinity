import {connection} from 'mongoose';
import messageSchema from './message.schema';
import type {MessageModel} from './message.types';

const db = connection.useDb('next-blog');

const Message = (db.models.Message ||
  db.model('Message', messageSchema)) as MessageModel;

export default Message;
