import {dbConnect} from './mongo';

export const nextDBConnect = async ({
  dbName = 'next-infinity',
  useOldUri = false,
}: {
  dbName?: string;
  useOldUri?: boolean;
} = {}) => {
  const MONGO_USER = process.env.MONGO_USER;
  const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
  const MONGO_CLUSTER = process.env.MONGO_CLUSTER;

  if (!MONGO_USER) {
    throw new Error(
      'Please define the MONGO_USER environment variable inside .env.local'
    );
  }
  if (!MONGO_PASSWORD) {
    throw new Error(
      'Please define the MONGO_PASSWORD environment variable inside .env.local'
    );
  }
  if (!MONGO_CLUSTER) {
    throw new Error(
      'Please define the MONGO_CLUSTER environment variable inside .env.local'
    );
  }

  const oldMongoOptions =
    '?ssl=true&replicaSet=atlas-6yp1ss-shard-0&authSource=admin&retryWrites=true&w=majority';

  const oldUri = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@ac-x8gslet-shard-00-00.ugcdgqg.mongodb.net:27017,ac-x8gslet-shard-00-01.ugcdgqg.mongodb.net:27017,ac-x8gslet-shard-00-02.ugcdgqg.mongodb.net:27017/${dbName}${oldMongoOptions}`;

  const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_CLUSTER}.ugcdgqg.mongodb.net/${dbName}`;

  const usedUri = useOldUri ? oldUri : uri;
  try {
    const client = await dbConnect({uri: usedUri});
    if (client) {
      console.info(`Connected to [${client.connections[0].name}] DB!`);
    }
    return client;
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(`Connecting to the database failed! ${err.message}`);
    throw err;
  }
};

export * from './mongo';
