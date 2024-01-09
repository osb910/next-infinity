import fs from 'fs';
import {parse} from 'csv-parse';
import Planet from './planet.model';
import {IPlanet} from './planet.types';
import {getPath} from '@/utils/path';

const isHabitablePlanet = (planet: IPlanet) => {
  return (
    planet['koi_disposition'] === 'CONFIRMED' &&
    planet['koi_insol'] > 0.36 &&
    planet['koi_insol'] < 1.11 &&
    planet['koi_prad'] < 1.6
  );
};

const savePlanet = async (planet: IPlanet) => {
  try {
    await Planet.updateOne(
      {
        keplerName: planet.keplerName,
      },
      {
        keplerName: planet.keplerName,
        koi_insol: planet.koi_insol,
        koi_prad: planet.koi_prad,
      },
      {
        upsert: true,
      }
    );
  } catch (err) {
    console.error(`Could not save planet ${err}.`);
  }
};

export const getAllPlanets = async () => {
  return await Planet.find({}, {_id: 0, __v: 0});
};

export const loadPlanetsData = () => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(getPath('./data/kepler_data.csv'))
      .pipe(
        parse({
          comment: '#',
          columns: true,
        })
      )
      .on('data', async data => {
        isHabitablePlanet(data) && (await savePlanet(data));
      })
      .on('error', err => {
        console.log(err);
        reject(err);
      })
      .on('end', async () => {
        const planetsCount = await Planet.countDocuments();
        console.log(`${planetsCount} habitable planets found!`);
        resolve(planetsCount);
      });
  });
};
