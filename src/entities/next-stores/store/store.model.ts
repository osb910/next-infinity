import {deleteOneObject} from '@/lib/s3';
import {connectDBs} from '@/utils/database';
import {Schema, Model, Types} from 'mongoose';
import slug from 'slug';

export interface IStore {
  _id?: Types.ObjectId | string;
  name: string;
  slug: string;
  description: string;
  tags: string[];
  location: {
    type: string;
    coordinates: number[];
    address: string;
  };
  photo?: {
    title: string;
    ext: string;
    mimeType: string;
    size: number;
    readableSize: string;
    key: string;
    etag: string;
  };
}

interface IStoreMethods {}

interface StoreModel extends Model<IStore, {}, IStoreMethods> {
  getTagsList: () => Promise<IStore[]>;
}

const storeSchema = new Schema<IStore, StoreModel, IStoreMethods>(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please enter a store name!'],
    },
    slug: String,
    description: {
      type: String,
      trim: true,
    },
    tags: [String],
    location: {
      type: {
        type: String,
        default: 'Point',
      },
      coordinates: [
        {
          type: Number,
          required: [true, 'You must supply coordinates!'],
        },
      ],
      address: {
        type: String,
        required: [true, 'You must supply an address'],
      },
    },
    photo: {
      key: String,
      etag: String,
      title: String,
      ext: String,
      mimeType: String,
      size: Number,
      readableSize: String,
    },
  },
  {
    timestamps: true,
    // statics: {
    //   getTagsList() {

    //   }
    // },
  }
);

storeSchema.pre('save', async function () {
  console.log(`saving ${this.name}...`);
  if (!this.isModified('name')) return;
  this.slug = slug(this.name);
  const slugRgx = new RegExp(`^${this.slug}((-\\d*$)?)$`, 'i');
  try {
    // @ts-ignore
    const storesWithSlug = await this.constructor.find({slug: slugRgx});
    if (storesWithSlug.length) {
      this.slug = `${this.slug}-${storesWithSlug.length + 1}`;
    }
  } catch (err) {
    console.error(err);
  }
});

storeSchema.pre('findOneAndUpdate', async function () {
  try {
    const docToUpdate = await this.model.findOne(this.getQuery());
    const update = this.getUpdate()! as IStore;
    if (!docToUpdate) {
      const err = new Error('Document not found!');
      throw err;
    }
    // Delete old photo if new photo is uploaded
    if (update.photo && docToUpdate.photo.key !== update.photo.key) {
      await deleteOneObject(`next-stores/${docToUpdate.photo.key}`);
    }
    // Update slug if name is changed
    if (docToUpdate.name !== update.name) {
      docToUpdate.slug = slug(update.name);
      const slugRgx = new RegExp(`^${docToUpdate.slug}((-\\d*$)?)$`, 'i');
      const storesWithSlug = await this.model.find({slug: slugRgx});
      if (storesWithSlug.length) {
        docToUpdate.slug = `${docToUpdate.slug}-${storesWithSlug.length + 1}`;
      }
      await docToUpdate.save();
    }
  } catch (err) {
    console.error(err);
  }
});

storeSchema.static('getTagsList', async function () {
  return await this.aggregate([
    {$unwind: '$tags'},
    {$group: {_id: '$tags', count: {$sum: 1}}},
    {$sort: {count: -1, _id: 1}},
  ]);
});

const {storesDB} = await connectDBs();

export default (storesDB.models?.Store as Model<IStore, StoreModel>) ||
  storesDB.model('Store', storeSchema);
