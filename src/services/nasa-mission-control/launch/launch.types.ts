import {type Model} from 'mongoose';

export interface ILaunch {
  flightNumber: number;
  mission: string;
  rocket: string;
  customers: Array<string>;
  launchDate: Date;
  upcoming: boolean;
  success?: boolean;
  target?: string;
}

export interface LaunchModel extends Model<ILaunch> {}
