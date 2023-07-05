import {mongoConnect} from '@/utils/database';

const mongoUri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.l774dlz.mongodb.net/next-events?retryWrites=true&w=majority`;
// const mongoUri = `mongodb://localhost:27017/next-events`;
// 'ac-gvklwum-shard-00-01.l774dlz.mongodb.net:27017,ac-gvklwum-shard-00-00.l774dlz.mongodb.net:27017,ac-gvklwum-shard-00-02.l774dlz.mongodb.net:27017';
// 'ssl=true&replicaSet=ac-gvklwum-shard-0&authSource=adminDB&';
const dbConnectNextEvents = async (): Promise<void> => {
  await mongoConnect(mongoUri);
};

export {dbConnectNextEvents};
