import {connect, connection} from 'mongoose';

const oldMongoOptions =
  '?ssl=true&replicaSet=atlas-6yp1ss-shard-0&authSource=admin&retryWrites=true&w=majority';

const nextInfinityOldUri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@ac-x8gslet-shard-00-00.ugcdgqg.mongodb.net:27017,ac-x8gslet-shard-00-01.ugcdgqg.mongodb.net:27017,ac-x8gslet-shard-00-02.ugcdgqg.mongodb.net:27017/`;

const nextInfinityUri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.ugcdgqg.mongodb.net/`;

const mongoConnect = async (uri: string, dbName?: string): Promise<any> => {
  const db = connection?.db;
  if (db) {
    console.log(`Already connected to ${db.databaseName}!`);
    return;
  }
  try {
    console.log('Connecting to MongoDB...');
    const client = await connect(
      // `${uri}${dbName ?? ''}?retryWrites=true&w=majority`,
      `${uri}${dbName ?? ''}${oldMongoOptions}`
    );

    if (dbName) {
      connection.useDb(dbName);
    }
    console.log(`Connected to ${client.connections[0].name} DB!`);
    return client;
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(`Connecting to the database failed! ${err.message}`);
    throw err;
  }
};

const connectDB = async (dbName?: string): Promise<any> => {
  try {
    await mongoConnect(nextInfinityOldUri, dbName);
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(`Connecting to the database failed! ${err.message}`);
    throw err;
  }
};

export {mongoConnect, connectDB};
