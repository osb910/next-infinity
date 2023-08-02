import {Schema, Model, Types, connection} from 'mongoose';

export type IProject = {
  _id?: Types.ObjectId | string;
  title: string;
  description: string;
  people: number;
  type?: 'active' | 'finished';
};

const db = connection.useDb('next-projects', {useCache: true});

const projectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    people: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ['active', 'finished'],
      default: 'active',
    },
  },
  {timestamps: true}
);

export default (db.models?.Project as Model<IProject>) ||
  db.model('Project', projectSchema);
