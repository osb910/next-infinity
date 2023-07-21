import {Schema, Model} from 'mongoose';
import {genSalt, hash, compare} from 'bcrypt';
import {connectDBs} from '@/utils/database';

import validator from 'validator';
const {isEmail} = validator;

export type IUser = {
  email: string;
  name: string;
  password: string;
};

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [isEmail, 'Invalid Email Address'],
    required: [true, 'Please provide an email address'],
  },
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
});

userSchema.pre(
  'save',
  async function (next: (error?: Error) => void): Promise<any> {
    if (!this.isModified('password')) return next();
    try {
      const existingUser = await this.collection.findOne({email: this.email});
      if (existingUser) {
        const err: Error = new Error('Email already in use');
        throw err;
      }
      const salt = await genSalt(12);
      this.password = await hash(this.password, salt);
      next();
    } catch (err) {
      if (!(err instanceof Error)) return;
      next(err);
    }
  }
);

userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  try {
    const match = await compare(password, this.password);
    return match;
  } catch (err) {
    return false;
  }
};

const {storesDB} = await connectDBs();

export default (storesDB.models?.Subscriber as Model<IUser>) ||
  storesDB.model('Store', userSchema);
