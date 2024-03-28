import {connection} from 'mongoose';
import postSchema from './post.schema';
import type {PostModel} from './post.types';
import {preSaveDoc} from '@/services/services.lib';

const db = connection.useDb('next-blog');

postSchema.pre('save', async function () {
  await preSaveDoc(this);
});

export default (db.models.User || db.model('Post', postSchema)) as PostModel;
