import Launch from './launch.model';
import Planet from '../planet';
import {ILaunch} from './launch.types';
import {getP8n} from '@/lib/helpers';

const DEFAULT_FLIGHT_NUMBER = 100;
const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query';

export const getLaunchById = async (launchId: number) => {
  return await Launch.findOne({
    flightNumber: launchId,
  });
};

const getLatestFlightNumber = async () => {
  const latestLaunch = await Launch.findOne().sort('-flightNumber');

  return latestLaunch?.flightNumber ?? DEFAULT_FLIGHT_NUMBER;
};

export const getAllLaunches = async (
  page: number | string | null,
  limit: number | string | null
) => {
  const count = await Launch.countDocuments();
  const p8n = getP8n(count, page, limit);
  const launches = await Launch.find({}, {_id: 0, __v: 0})
    .sort({flightNumber: 1})
    .skip(p8n.skip)
    .limit(p8n.limit);
  return {launches, p8n};
};

const saveLaunch = async (launch: ILaunch) => {
  return await Launch.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {upsert: true, new: true}
  );
};

const populateLaunches = async () => {
  console.log('Downloading launch data...');
  const res = (await fetch(SPACEX_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': '*',
    },
    body: JSON.stringify({
      query: {},
      options: {
        pagination: false,
        populate: [
          {
            path: 'rocket',
            select: {
              name: 1,
            },
          },
          {
            path: 'payloads',
            select: {
              customers: 1,
            },
          },
        ],
      },
    }),
  })) as Response;

  if (res.status !== 200) {
    console.log('Problem downloading launch data');
    throw new Error('Launch data download failed');
  }
  const json = (await res.json()) as {docs: any[]};

  const launchDocs = json.docs;
  launchDocs.forEach(async launchDoc => {
    const payloads = launchDoc['payloads'];
    const customers = payloads.flatMap((payload: any) => payload['customers']);

    const launch = {
      flightNumber: launchDoc['flight_number'],
      mission: launchDoc['name'],
      rocket: launchDoc['rocket']['name'],
      launchDate: launchDoc['date_local'],
      upcoming: launchDoc['upcoming'],
      success: launchDoc['success'],
      customers,
    };
    console.log(`${launch.flightNumber} ${launch.mission}`);

    await saveLaunch(launch);
  });
};

export const loadLaunchesData = async () => {
  const firstLaunch = await Launch.findOne({
    flightNumber: 1,
    rocket: 'Falcon 1',
    mission: 'FalconSat',
  });

  firstLaunch
    ? console.log('Launch data already loaded!')
    : await populateLaunches();
};

export const scheduleNewLaunch = async (launch: ILaunch) => {
  const planet = await Planet.findOne({
    keplerName: launch.target,
  });

  if (!planet) {
    throw new Error('No matching planet was found.');
  }

  const newFlightNum = (await getLatestFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ['Next Infinity', 'NASA'],
    flightNumber: newFlightNum,
  });

  return await saveLaunch(newLaunch);
};

export const abortLaunchById = async (launchId: number) => {
  const {modifiedCount} = await Launch.updateOne(
    {
      flightNumber: launchId,
    },
    {
      upcoming: false,
      success: false,
    }
  );

  return modifiedCount === 1;
};
