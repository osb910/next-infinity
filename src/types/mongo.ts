import type {Types, Document, HydratedDocument} from 'mongoose';

export interface DocResult<T> extends Document<Types.ObjectId> {
  _doc: T;
}

export type HDoc<T> = HydratedDocument<T> & {
  _doc: T;
};
