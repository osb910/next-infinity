// app/instrumentation.ts

export const register = async () => {
  try {
    const {connectDB} = await import('./utils/database');
    await connectDB();
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err.message);
  }
};
