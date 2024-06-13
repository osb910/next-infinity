import type {Model, Types, Document} from 'mongoose';

export interface IUser extends Document<Types.ObjectId> {
  email: string;
  name: string;
  password: string;
  favorites: Array<string>;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  gravatar?: string;
}

export interface IUserMethods {
  comparePassword(password: string): Promise<boolean>;
}

export interface IUserVirtuals {
  gravatar: string;
  domain: string;
}

export interface UserModel
  extends Model<IUser, {}, IUserMethods, IUserVirtuals> {}
