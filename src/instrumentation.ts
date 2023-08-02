// app/instrumentation.ts

import {mongoConnect} from './utils/database';

const nextInfinityUri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.ugcdgqg.mongodb.net/?retryWrites=true&w=majority`;

export const register = async () => {
  try {
    await mongoConnect(nextInfinityUri);
  } catch (err) {
    console.error(err);
    // const {connectDBs} = await import('./utils/database');
    // await connectDBs();
  }
};
