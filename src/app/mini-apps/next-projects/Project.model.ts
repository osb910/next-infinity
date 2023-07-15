import {Schema, Model, Types} from 'mongoose';
import {connectDBs} from '@/utils/database';

export type IProject = {
  _id?: Types.ObjectId | string;
  title: string;
  description: string;
  people: number;
  type?: 'active' | 'finished';
};

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

const {projectsDB} = await connectDBs();

export default (projectsDB.models?.Event as Model<IProject>) ||
  projectsDB.model('Project', projectSchema);
