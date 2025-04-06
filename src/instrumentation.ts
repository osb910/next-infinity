// app/instrumentation.ts

export const register = async () => {
  try {
    // const {nextDBConnect} = await import('./lib/db');
    // await nextDBConnect({useOldUri: true});
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err.message);
  }
};
