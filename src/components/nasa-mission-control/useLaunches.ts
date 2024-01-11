'use client';

import {FormEvent, useCallback, useEffect, useState} from 'react';

import {
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
} from '@/components/nasa-mission-control/launch.requests';
import {ILaunch} from '@/services/nasa-mission-control/launch';

type UseLaunchesHook = (
  onSuccessSound: () => void,
  onAbortSound: () => void,
  onFailureSound: () => void
) => {
  launches: any[];
  isPendingLaunch: boolean;
  submitLaunch: (e: any) => Promise<void>;
  abortLaunch: (id: number) => Promise<void>;
};

const useLaunches: UseLaunchesHook = (
  onSuccessSound,
  onAbortSound,
  onFailureSound
) => {
  const [launches, saveLaunches] = useState<ILaunch[]>([]);
  const [isPendingLaunch, setPendingLaunch] = useState(false);

  const getLaunches = useCallback(async () => {
    const {data: fetchedLaunches} = (await httpGetLaunches()) as {
      data: ILaunch[];
    };
    saveLaunches(fetchedLaunches);
  }, []);

  useEffect(() => {
    getLaunches();
  }, [getLaunches]);

  const submitLaunch = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setPendingLaunch(true);
      const data = new FormData(e.currentTarget);
      const launchDate = new Date(data.get('launch-day') as string);
      const mission = data.get('mission-name') as string;
      const rocket = data.get('rocket-name') as string;
      const target = data.get('planets-selector') as string;
      const json = (await httpSubmitLaunch({
        launchDate,
        mission,
        rocket,
        target,
      })) as any;

      if (json.status === 'success') {
        getLaunches();
        setTimeout(() => {
          setPendingLaunch(false);
          onSuccessSound();
        }, 800);
      } else {
        onFailureSound();
      }
    },
    [getLaunches, onSuccessSound, onFailureSound]
  );

  const abortLaunch = useCallback(
    async (id: number) => {
      const json = (await httpAbortLaunch(id)) as any;

      if (json.status === 'success') {
        getLaunches();
        onAbortSound();
      } else {
        onFailureSound();
      }
    },
    [getLaunches, onAbortSound, onFailureSound]
  );

  return {
    launches,
    isPendingLaunch,
    submitLaunch,
    abortLaunch,
  };
};

export default useLaunches;
