import {DocResult} from '@/types';
import {Model, Types} from 'mongoose';

export interface IInventory extends DocResult<IInventory> {
  name: string;
  slug: string;
  location: string;
  items: Array<Types.ObjectId>;
}

export type InventoryModel = Model<IInventory>;
