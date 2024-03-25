import {type HydratedDocument} from 'mongoose';

export type HDoc<T> = HydratedDocument<T> & {
  _doc: T;
};
