import {Schema, Model, connection} from 'mongoose';
import {genSalt, hash, compare} from 'bcrypt';
import {Md5} from 'ts-md5';

import validator from 'validator';
const {isEmail} = validator;

const db = connection.useDb('next-stores');
export interface IUser {
  _id?: string;
  email: string;
  name: string;
  password: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  gravatar?: string;
  domain?: string;
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
    resetPasswordToken: String,
    resetPasswordExpires: Date,
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
  const gravatarHash = Md5.hashStr(this.email.trim().toLowerCase());
  return `https://www.gravatar.com/avatar/${gravatarHash}?s=200&d=retro`;
});

userSchema.pre('save', async function (): Promise<any> {
  if (!this.isModified('password')) return;
  try {
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

export default (db.models.User as Model<IUser, UserModel>) ||
  db.model('User', userSchema);
