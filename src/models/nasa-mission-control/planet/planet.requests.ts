'use client';

import ky from 'ky';

const API_URL = 'api/nasa-mission-control/v1';

export const httpGetPlanets = async () => {
  try {
    return await ky.get(`${API_URL}/planets`).json();
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err.message);
    return err;
  }
};
