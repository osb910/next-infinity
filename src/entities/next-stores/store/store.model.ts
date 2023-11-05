import {deleteOneObject} from '@/lib/s3';
import {Schema, Model, Types, connection} from 'mongoose';
import slug from 'slug';
import User from '../user/user.model';

const db = connection.useDb('next-stores');

export interface IStore {
  _id?: Types.ObjectId;
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
  author: Types.ObjectId;
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
    author: {
      type: Schema.Types.ObjectId,
      ref: User,
      required: [true, 'You must supply an author'],
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

storeSchema.index({name: 'text', description: 'text'});
storeSchema.index({location: '2dsphere'});

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

export const postDeleteStore = async (store: IStore) => {
  console.log(`store ${store.slug} deleted`);
  try {
    await User.updateMany({_id: store.author}, {$pull: {favorites: store._id}});
  } catch (err) {
    throw err;
  }
};

storeSchema.post('findOneAndDelete', async function (doc: IStore) {
  await postDeleteStore(doc);
});

storeSchema.static('getTagsList', async function () {
  return await this.aggregate([
    {$unwind: '$tags'},
    {$group: {_id: '$tags', count: {$sum: 1}}},
    {$sort: {count: -1, _id: 1}},
  ]);
});

export default (db.models.Store as Model<IStore, StoreModel>) ||
  db.model('Store', storeSchema);
