import {mongoConnect} from '@/utils/database';
import mongoose from 'mongoose';

const mongoUri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.l774dlz.mongodb.net/next-events?retryWrites=true&w=majority`;

const localMongoUri = `mongodb://localhost:27017/next-events`;

const oldMongoUri = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@ac-gvklwum-shard-00-00.l774dlz.mongodb.net:27017,ac-gvklwum-shard-00-01.l774dlz.mongodb.net:27017,ac-gvklwum-shard-00-02.l774dlz.mongodb.net:27017/next-events?ssl=true&replicaSet=atlas-i4i6o3-shard-0&authSource=admin&retryWrites=true&w=majority`;

const dbConnectNextEvents = async (): Promise<void> => {
  const dbName = mongoose.connection?.db?.namespace;
  console.log({dbName});
  dbName !== 'next-events' && (await mongoConnect(oldMongoUri));
};

export {dbConnectNextEvents};
