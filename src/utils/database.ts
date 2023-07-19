import {connect, createConnection} from 'mongoose';

const mongoUri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.l774dlz.mongodb.net/next-events?retryWrites=true&w=majority`;

const localMongoUri = `mongodb://localhost:27017/next-events`;

const oldMongoUri = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@ac-gvklwum-shard-00-00.l774dlz.mongodb.net:27017,ac-gvklwum-shard-00-01.l774dlz.mongodb.net:27017,ac-gvklwum-shard-00-02.l774dlz.mongodb.net:27017/`;
const mongoUriOptions =
  '?ssl=true&replicaSet=atlas-i4i6o3-shard-0&authSource=admin&retryWrites=true&w=majority';

const storesUri = `mongodb+srv://potato-slice:vK7hpf8FRqlgpFfN@potato.o9cpijt.mongodb.net/potatodb?retryWrites=true&w=majority`;

const mongoConnect = async (uri: string): Promise<void> => {
  try {
    console.log('Connecting to MongoDB...');
    const client = await connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as any);
    console.log(`Connected to ${client.connections[0].name} DB!`);
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
    } as any);

    return {eventsDB, projectsDB, storesDB};
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(`Connecting to the databases failed! ${err.message}`);
    throw err;
  }
};

export {mongoConnect, connectDBs};
