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
    if (!(err instanceof Error)) return;
    console.error(`Connecting to the database failed! ${err.message}`);
    throw err;
  }
};

export {mongoConnect};
