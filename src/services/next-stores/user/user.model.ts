import {connection} from 'mongoose';
import userSchema from './user.schema';
import {UserModel} from './user.types';
import {
  comparePassword,
  getDomain,
  getGravatar,
  preSaveDoc,
} from '@/services/lib';

const db = connection.useDb('next-stores');

userSchema.virtual('domain').get(function () {
  return getDomain(this.email);
});

userSchema.virtual('gravatar').get(async function () {
  return getGravatar(this.email);
});

userSchema.pre('save', async function () {
  await preSaveDoc(this);
});

userSchema.method('comparePassword', async function (password: string) {
  return await comparePassword(password, this.password);
});

export default (db.models.User || db.model('User', userSchema)) as UserModel;
