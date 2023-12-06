// app/instrumentation.ts

export const register = async () => {
  try {
    const {connectDB} = await import('./lib/database');
    const {loadPlanetsData} = await import(
      './models/nasa-mission-control/planet'
    );
    const {loadLaunchesData} = await import(
      './models/nasa-mission-control/launch'
    );
    await connectDB();
    await loadPlanetsData();
    await loadLaunchesData();
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err.message);
  }
};
