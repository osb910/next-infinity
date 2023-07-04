import {mongoConnect} from '@/utils/database';

const mongoUri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.l774dlz.mongodb.net/?retryWrites=true&w=majority`;

const dbConnectNextEvents = async (): Promise<void> => {
  await mongoConnect('mongodb://localhost:27017/next-events');
};

export {dbConnectNextEvents};
