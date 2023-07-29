import {Schema, Model} from 'mongoose';
import {genSalt, hash, compare} from 'bcrypt';
import {connectDBs} from '@/utils/database';
import {Md5} from 'ts-md5';

import validator from 'validator';
const {isEmail} = validator;

export interface IUser {
  email: string;
  name: string;
  password: string;
}

interface IUserMethods {
  comparePassword(password: string): Promise<boolean>;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
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
  },
  {
    toJSON: {virtuals: true},
    toObject: {virtuals: true},
    timestamps: true,
  }
);

userSchema.virtual('domain').get(function () {
  return this.email.slice(this.email.indexOf('@') + 1);
});

userSchema.virtual('gravatar').get(async function () {
  const gravatarHash = Md5.hashStr(this.email.trim().toLowerCase()) as string;
  return `https://www.gravatar.com/avatar/${gravatarHash}?s=200&d=retro`;
});

userSchema.pre('save', async function (): Promise<any> {
  if (!this.isModified('password')) return;
  try {
    // const existingUser = await this.collection.findOne({email: this.email});
    const salt = await genSalt(12);
    this.password = await hash(this.password, salt);
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err);
  }
});

userSchema.method(
  'comparePassword',
  async function (password: string): Promise<boolean> {
    try {
      const match = await compare(password, this.password);
      return match;
    } catch (err) {
      return false;
    }
  }
);

const {storesDB} = await connectDBs();

export default (storesDB.models?.User as Model<IUser, UserModel>) ||
  storesDB.model('User', userSchema);
