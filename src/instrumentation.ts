import {connection} from 'mongoose';
// app/instrumentation.ts

export const register = async () => {
  try {
    // const {dbConnectNextEvents} = await import('./app/next-events/database');
    // await dbConnectNextEvents();
    const {connectDBs} = await import('./utils/database');
    await connectDBs();
  } catch (err) {
    console.error(err);
    const {connectDBs} = await import('./utils/database');
    await connectDBs();
    // const {dbConnectNextEvents} = await import('./app/next-events/database');
    // await dbConnectNextEvents();
  }
};
