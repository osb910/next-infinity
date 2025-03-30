import {NextResponse} from 'next/server';
import {getAllPlanets} from '@/services/nasa-mission-control/planet';
import loadNASAData from '@/services/nasa-mission-control/nasa.middleware';
import type {AppRoute} from '@/types';

export const GET: AppRoute = async () => {
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
