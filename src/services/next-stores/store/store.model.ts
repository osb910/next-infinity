import {connection, type UpdateQuery} from 'mongoose';
import storeSchema from './store.schema';
import {postDeleteStore, preUpdateStore} from './store.middleware';
import {findStoresWithReviews} from './store.controllers';
import {getFieldList, getTopRated, preSaveDoc} from '@/services/services.lib';
import type {IStore, StoreModel} from './store.types';

const db = connection.useDb('next-stores');

storeSchema.index({name: 'text', description: 'text'});
storeSchema.index({location: '2dsphere'});

storeSchema.pre('save', async function () {
  await preSaveDoc(this);
});

storeSchema.pre('findOneAndUpdate', async function () {
  await preUpdateStore(
    this.model,
    this.getQuery(),
    this.getUpdate() as UpdateQuery<IStore>
  );
});

storeSchema.post('findOneAndDelete', async function (doc: IStore) {
  await postDeleteStore(doc);
});

storeSchema.static(
  'findWithReviews',
  async function ({page, limit, query, extraPipeline = []}) {
    return await findStoresWithReviews(this, {
      page,
      limit,
      query,
      extraPipeline,
    });
  }
);

storeSchema.static('getTagsList', async function () {
  return await getFieldList(this, 'tags');
});

storeSchema.static('getTopStores', async function (page, limit) {
  const {docs, p8n} = await getTopRated(this, {
    page,
    limit,
    foreignField: 'store',
  });
  return {
    status: 'success',
    code: 200,
    message: `Successfully fetched stores!`,
    ...p8n,
    data: docs,
  };
});

const Store = (db.models.Store || db.model('Store', storeSchema)) as StoreModel;

export default Store;
