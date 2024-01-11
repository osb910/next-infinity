'use client';

import {useCallback, useEffect, useState} from 'react';
import {httpGetPlanets} from '@/components/nasa-mission-control/planet.requests';
import {IPlanet} from '@/services/nasa-mission-control/planet';

const usePlanets = () => {
  const [planets, savePlanets] = useState<IPlanet[]>([]);

  const getPlanets = useCallback(async () => {
    const {data: fetchedPlanets} = (await httpGetPlanets()) as {
      data: IPlanet[];
    };
    savePlanets(fetchedPlanets);
  }, []);

  useEffect(() => {
    getPlanets();
  }, [getPlanets]);

  return planets;
};

export default usePlanets;
