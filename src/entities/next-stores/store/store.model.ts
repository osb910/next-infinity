import {connectDBs} from '@/utils/database';
import {Schema, Model, Types} from 'mongoose';
import slug from 'slug';

export type IStore = {
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
  photo: string;
};

const storeSchema = new Schema<IStore>(
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
    photo: String,
  },
  {timestamps: true}
);

storeSchema.pre('save', async function (next) {
  if (!this.isModified('name')) {
    return next();
  }
  this.slug = slug(this.name);
  const slugRgx = new RegExp(`^${this.slug}((-\\d*$)?)$`, 'i');
  const storesWithSlug = await this.constructor.find({slug: slugRgx});
  if (storesWithSlug.length) {
    this.slug = `${this.slug}-${storesWithSlug.length + 1}`;
  }
  next();
});

storeSchema.statics.getTagsList = function () {
  return this.aggregate([
    {$unwind: '$tags'},
    {$group: {_id: '$tags', count: {$sum: 1}}},
    {$sort: {count: -1}},
  ]);
};

const {storesDB} = await connectDBs();

export default (storesDB.models?.Subscriber as Model<IStore>) ||
  storesDB.model('Store', storeSchema);
