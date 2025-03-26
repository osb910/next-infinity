import type {Document, Model, Types} from 'mongoose';
import type {FileInfo, GeoLocation} from '@/types';
import {IPost} from '../post';

export interface IUser extends Document<Types.ObjectId> {
  email: string;
  firstName: string;
  lastName?: string;
  password: string;
  bookmarks: Array<Types.ObjectId | string | IPost>;
  resetPasswordCode?: string;
  resetPasswordExpires?: Date;
  gender: 'M' | 'F';
  avatar?: FileInfo;
  preferredLocale?: string;
  location?: GeoLocation;
  comparePassword(password: string): Promise<boolean>;
  addBookmark(id: Types.ObjectId | string): Promise<boolean>;
  removeBookmark(id: Types.ObjectId | string): Promise<boolean>;
}

export interface IUserMethods {
  domain(): string;
  fullName(): string;
}

export type UserModel = Model<IUser, object, IUserMethods>;
