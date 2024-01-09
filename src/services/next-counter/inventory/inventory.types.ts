import {Document, Model, Types} from 'mongoose';

export interface IInventory extends Document {
  name: string;
  slug: string;
  location: string;
  items: Array<Types.ObjectId>;
}

export interface InventoryModel extends Model<IInventory> {}
