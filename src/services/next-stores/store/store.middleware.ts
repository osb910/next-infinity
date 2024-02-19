import slug from 'slug';
import User from '../user';
import {deleteObject} from '@/lib/files/s3';
import type {Model, HydratedDocument, FilterQuery, UpdateQuery} from 'mongoose';
import {type IStore} from './store.types';

export const preUpdateStore = async (
  Model: Model<IStore>,
  filter: FilterQuery<IStore>,
  update: UpdateQuery<IStore>
) => {
  try {
    const doc = await Model.findOne(filter);

    if (!doc) {
      const err = new Error('Document not found!');
      throw err;
    }
    // Delete old photo if new photo is uploaded
    if (update.photo && doc.photo?.key !== update.photo.key) {
      await deleteObject(`next-stores/${doc.photo?.key}`);
    }
    // Update slug if name is changed
    if (doc.name !== update.name) {
      doc.slug = slug(update.name);
      const slugRgx = new RegExp(`^${doc.slug}((-\\d*$)?)$`, 'i');
      const storesWithSlug = await Model.find({slug: slugRgx});
      if (storesWithSlug.length) {
        doc.slug = `${doc.slug}-${storesWithSlug.length + 1}`;
      }
      await doc.save();
    }
  } catch (err) {
    console.error(err);
  }
};

export const postDeleteStore = async (store: IStore) => {
  console.log(`store ${store.slug} deleted`);
  try {
    await User.updateMany({_id: store.author}, {$pull: {favorites: store._id}});
  } catch (err) {
    throw err;
  }
};
