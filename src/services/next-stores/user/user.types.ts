import type {DocResult} from '@/types';
import type {Model} from 'mongoose';

export interface IUser extends DocResult<IUser> {
  email: string;
  name: string;
  password: string;
  favorites: Array<string>;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  gravatar?: string;
  comparePassword(password: string): Promise<boolean>;
}

export interface IUserVirtuals {
  gravatar: string;
  domain: string;
}

export type UserModel = Model<IUser, unknown, unknown, IUserVirtuals>;
