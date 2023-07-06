import {connect} from 'mongoose';

const mongoConnect = async (uri: string): Promise<void> => {
  try {
    console.log('Connecting to MongoDB...');
    const client = await connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as any);
    console.log(`Connected to ${client.connections[0].name} DB!`);
  } catch (err) {
    console.error(
      `Connecting to the database failed! ${(err as Error).message}`
    );
    throw err;
  }
};

export {mongoConnect};
