import {connect, connection, createConnection} from 'mongoose';

const oldMongoUri = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@ac-gvklwum-shard-00-00.l774dlz.mongodb.net:27017,ac-gvklwum-shard-00-01.l774dlz.mongodb.net:27017,ac-gvklwum-shard-00-02.l774dlz.mongodb.net:27017/`;
const mongoUriOptions =
  '?ssl=true&replicaSet=atlas-i4i6o3-shard-0&authSource=admin&retryWrites=true&w=majority';

const storesUri = `mongodb+srv://${process.env.MONGO_USER_POTATO}:${process.env.MONGO_PASSWORD_POTATO}@potato.o9cpijt.mongodb.net/potatodb?retryWrites=true&w=majority`;

const nextInfinityUri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.ugcdgqg.mongodb.net/`;

const mongoConnect = async (uri: string, dbName?: string): Promise<void> => {
  const db = connection?.db;
  if (db) {
    console.log('Already connected to MongoDB!');
    return;
  }
  try {
    console.log('Connecting to MongoDB...');
    const client = await connect(
      `${uri}${dbName ?? ''}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as any
    );
    if (dbName) {
      connection.useDb(dbName);
    }
    console.log(`Connected to ${client.connections[0].name} DB!`);
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(`Connecting to the database failed! ${err.message}`);
    throw err;
  }
};

const connectDB = async (dbName?: string): Promise<any> => {
  try {
    await mongoConnect(nextInfinityUri, dbName);
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(`Connecting to the database failed! ${err.message}`);
    throw err;
  }
};

const connectDBs = async (): Promise<any> => {
  try {
    const eventsDB = await createConnection(
      `${oldMongoUri}next-events${mongoUriOptions}`,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      } as any
    );

    const projectsDB = await createConnection(
      `${oldMongoUri}next-projects${mongoUriOptions}`,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      } as any
    );

    const storesDB = await createConnection(storesUri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    } as any).asPromise();

    return {eventsDB, projectsDB, storesDB};
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(`Connecting to the databases failed! ${err.message}`);
    throw err;
  }
};

export {mongoConnect, connectDB, connectDBs};
