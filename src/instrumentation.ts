export const register = async () => {
  try {
    const {dbConnectNextEvents} = await import('./app/next-events/database');
    await dbConnectNextEvents();
  } catch (err) {
    console.error(err);
  }
};
