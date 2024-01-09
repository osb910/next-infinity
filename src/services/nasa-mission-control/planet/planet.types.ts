import {type Model} from 'mongoose';

export interface IPlanet {
  keplerName: string;
  koi_disposition: 'CONFIRMED' | 'CANDIDATE' | 'FALSE POSITIVE';
  koi_insol: number;
  koi_prad: number;
}

export interface PlanetModel extends Model<IPlanet> {}
