import mongoose, {connect, connection} from 'mongoose';
// declare global {
//   var mongoose: any; // This must be a `var` and not a `let / const`
// }

// const MONGODB_URI = process.env.MONGODB_URI!;

// if (!MONGODB_URI) {
//   throw new Error(
//     'Please define the MONGODB_URI environment variable inside .env.local'
//   );
// }

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = {conn: null, promise: null};
// }

// const dbConnect = async () => {
//   if (cached.conn) {
//     return cached.conn;
//   }
//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false,
//     };
//     cached.promise = mongoose.connect(MONGODB_URI, opts).then(mongoose => {
//       return mongoose;
//     });
//   }
//   try {
//     cached.conn = await cached.promise;
//   } catch (e) {
//     cached.promise = null;
//     throw e;
//   }

//   return cached.conn;
// };

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
