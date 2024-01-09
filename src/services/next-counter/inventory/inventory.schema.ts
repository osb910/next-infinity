import {Schema} from 'mongoose';
import {IInventory, InventoryModel} from './inventory.types';

const inventorySchema = new Schema<IInventory, InventoryModel>(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
    location: {
      type: String,
      required: true,
    },
    items: [{type: Schema.Types.ObjectId}],
  },
  {
    timestamps: true,
  }
);

export default inventorySchema;
