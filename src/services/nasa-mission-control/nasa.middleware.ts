import {loadLaunchesData} from './launch';
import {loadPlanetsData} from './planet';

const loadNASAData = async () => {
  try {
    await Promise.all([loadPlanetsData(), loadLaunchesData()]);
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err.message);
  }
};

export default loadNASAData;
