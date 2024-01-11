'use client';

import ky from 'ky';
import {ILaunch} from '@/services/nasa-mission-control/launch/launch.types';

const API_URL = 'api/nasa-mission-control/v1';

export const httpGetLaunches = async () => {
  try {
    return await ky.get(`${API_URL}/launches`).json();
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err.message);
    return err;
  }
};

export const httpSubmitLaunch = async (
  launch: Pick<ILaunch, 'launchDate' | 'rocket' | 'mission' | 'target'>
) => {
  try {
    return await ky
      .post(`${API_URL}/launches`, {
        json: launch,
      })
      .json();
  } catch (err) {
    return err;
  }
};

export const httpAbortLaunch = async (launchId: number) => {
  try {
    return await ky.delete(`${API_URL}/launches/${launchId}`).json();
  } catch (err) {
    console.log(err);
    return err;
  }
};
