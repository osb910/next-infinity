import {NextRequest, NextResponse} from 'next/server';
import {getAllPlanets} from '@/models/nasa-mission-control/planet';
import loadNASAData from '@/models/nasa-mission-control/nasa.middleware';

export const GET = async (req: NextRequest) => {
  try {
    await loadNASAData();
    const planets = await getAllPlanets();
    return NextResponse.json(
      {
        status: 'success',
        code: 200,
        count: planets.length,
        data: planets,
      },
      {status: 200}
    );
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err.message);
    return NextResponse.json(
      {
        status: 'error',
        message: err.message,
        code: 500,
      },
      {status: 500}
    );
  }
};
