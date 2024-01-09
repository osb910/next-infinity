import {Schema, connection} from 'mongoose';
import {IPlanet, PlanetModel} from './planet.types';

const db = connection.useDb('nasa-mission-control');

const planetSchema = new Schema<IPlanet>(
  {
    keplerName: {
      type: String,
      required: true,
    },
    koi_disposition: {
      type: String,
    },
    koi_insol: {
      type: Number,
    },
    koi_prad: {
      type: Number,
    },
  },
  {timestamps: true}
);

const Planet = (db.models.Planet ||
  db.model('Planet', planetSchema)) as PlanetModel;

export default Planet;
