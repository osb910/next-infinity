import {connect, connection, type Collection, type Document} from 'mongoose';

// import mongoose from 'mongoose';
declare global {
  // eslint-disable-next-line
  var mongoose: any; // This must be a `var` and not a `let / const`
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {conn: null, promise: null};
}

const opts = {
  // bufferCommands: false,
  maxPoolSize: 1,
  minPoolSize: 1,
  serverSelectionTimeoutMS: 5000, // Fail fast if no server is found
  socketTimeoutMS: 30000, // Socket idle timeout
  heartbeatFrequencyMS: 10000, // Ping server every 10 seconds
  maxIdleTimeMS: 10000, // Reap idle connections after 10 seconds
  waitQueueTimeoutMS: 5000, // Timeout for connection queue
};

const mongoConnect = async (uri: string, dbName?: string): Promise<any> => {
  const db = connection?.db;
  if (dbName && dbName !== db?.databaseName) {
    connection.useDb(dbName);
    return;
  }
  if (db) {
    console.log(`Already connected to ${db.databaseName}!`);
    return;
  }
  try {
    console.log('Connecting to MongoDB...');
    const client = await connect(uri);

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

export async function dbConnect({uri, dbName}: {uri: string; dbName?: string}) {
  const db = connection?.db;
  if (dbName && dbName !== db?.databaseName) {
    connection.useDb(dbName);
    return;
  }

  if (db) {
    console.log(`Already connected to ${db.databaseName}!`);
    return;
  }

  if (cached.conn && cached.conn.readyState === 1) {
    return cached.conn;
  }

  // Wait for an in-progress connection if one exists
  if (cached.promise) {
    cached.conn = await cached.promise;
    return cached.conn;
  }

  console.log('Connecting to MongoDB...');

  cached.promise = connect(uri, opts)
    .then((mongoClient) => mongoClient)
    .catch((err) => {
      console.error(`MongoDB: Connection error - ${err.message}`);
      cached.promise = null;
      throw err;
    });

  cached.conn = await cached.promise;
  return cached.conn;
}

type QueryParams = {
  [key: string]: unknown;
};

export const listDbCollections = async (
  dbName: string
): Promise<Array<string> | undefined> => {
  try {
    const db = connection.useDb(dbName);
    const collectionArray = await db.db?.listCollections().toArray();
    return collectionArray?.map(({name}: {name: string}) => name);
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err.message);
    throw err;
  }
};

export const getDbCollections = async (
  dbName: string
): Promise<Array<Collection<Document>> | unknown> => {
  try {
    const db = connection.useDb(dbName);
    const collections = await db.db?.collections();
    return collections;
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err.message);
    throw err;
  }
};

export const requestMongo = async (
  endpoint: string,
  collection: string,
  query: QueryParams,
  db: string
): Promise<unknown> => {
  const BASE_URI = `https://eu-west-2.aws.data.mongodb-api.com/app/${process.env.MONGO_APP_ID}/endpoint/data/v1/action`;
  try {
    const res = await fetch(`${BASE_URI}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Requested-Headers': '*',
        'api-key': process.env.MONGO_DATA_API_KEY!,
      },
      body: JSON.stringify({
        dataSource: process.env.MONGO_DATA_CLUSTER,
        database: db,
        collection,
        ...query,
      }),
    });
    // const text = await res.text();
    // const json = text ? JSON.parse(text) : null;
    const json = await res.json();
    console.log({json});

    // if (json === null && text) {
    //   throw new Error('Malformed response');
    // }
    return json;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
