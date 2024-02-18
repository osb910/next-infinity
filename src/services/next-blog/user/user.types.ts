import type {Document, Model, Types} from 'mongoose';
import type {GeoLocation} from '@/types';

export interface IUser extends Document {
  email: string;
  name: {
    first: string;
    last?: string;
  };
  password: string;
  bookmarks: Array<Types.ObjectId>;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  avatar?: string;
  preferredLocale?: string;
  location: {
    type: 'Point';
    address?: string;
  } & GeoLocation;
}

export interface IUserMethods {
  comparePassword(password: string): Promise<boolean>;
}

export interface IUserVirtuals {
  domain: string;
}

export interface UserModel
  extends Model<IUser, {}, IUserMethods, IUserVirtuals> {}
