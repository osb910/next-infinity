import {Schema, connection} from 'mongoose';
import type {LaunchModel} from './launch.types';

const db = connection.useDb('nasa-mission-control');

const launchSchema = new Schema({
  flightNumber: {
    type: Number,
    required: true,
  },
  launchDate: {
    type: Date,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  rocket: {
    type: String,
    required: true,
  },
  target: {
    type: String,
  },
  customers: [String],
  upcoming: {
    type: Boolean,
    required: true,
  },
  success: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const Launch = (db.models.Launch ||
  db.model('Launch', launchSchema)) as LaunchModel;

export default Launch;
