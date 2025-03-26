import slugify from 'slugify';
import {deleteObject} from '@/lib/files/s3';
import type {Model, FilterQuery, UpdateQuery} from 'mongoose';
import {type IYTAudio} from './yt-audio.types';

export const preUpdateAudio = async (
  Model: Model<IYTAudio>,
  filter: FilterQuery<IYTAudio>,
  update: UpdateQuery<IYTAudio>
) => {
  try {
    const doc = await Model.findOne(filter);

    if (!doc) {
      const err = new Error('Document not found!');
      throw err;
    }
    // Delete old audio if new audio is uploaded
    if (update?.audio && doc?.audio?.key !== update?.audio?.key) {
      await deleteObject(`yt-converter/${doc?.audio?.key}`);
    }
    // Update slug if title is changed
    if (doc.title !== update.title) {
      doc.slug = slugify(update.title);
      const slugRegex = new RegExp(`^${doc.slug}((-\\d*$)?)$`, 'i');
      const audiosWithSlug = await Model.find({slug: slugRegex});
      if (audiosWithSlug.length) {
        doc.slug = `${doc.slug}-${audiosWithSlug.length + 1}`;
      }
      await doc.save();
    }
  } catch (err) {
    console.error(err);
  }
};

export const postDeleteAudio = async (store: IYTAudio) => {
  console.log(`store ${store.slug} deleted`);
  try {
    // await User.updateMany({_id: store.author}, {$pull: {favorites: store._id}});
  } catch (err) {
    throw err;
  }
};
