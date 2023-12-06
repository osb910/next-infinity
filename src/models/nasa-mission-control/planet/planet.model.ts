import {Schema, Model, connection} from 'mongoose';
import {IPlanet} from './planet.types';

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

const Planet =
  (db.models.Planet as Model<IPlanet>) || db.model('Planet', planetSchema);

export default Planet;
