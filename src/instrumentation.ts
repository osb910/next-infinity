// app/instrumentation.ts

export const register = async () => {
  try {
    const {connectDB} = await import('./lib/database');
    await connectDB();
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err.message);
  }
};
