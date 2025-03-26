import {connection} from 'mongoose';
import inventorySchema from './inventory.schema';
import {preSaveDoc} from '@/services/lib';
import type {InventoryModel} from './inventory.types';

const db = connection.useDb('next-stores');

inventorySchema.index({name: 'text', location: 'text'});

inventorySchema.pre('save', async function () {
  await preSaveDoc(this);
});

const Inventory = (db.models.Inventory ||
  db.model('Inventory', inventorySchema)) as InventoryModel;

export default Inventory;
