import {connection, type UpdateQuery} from 'mongoose';
import ytAudioSchema from './yt-audio.schema';
import {postDeleteAudio, preUpdateAudio} from './yt-audio.middleware';
import {preSaveDoc} from '@/services/lib';
import type {IYTAudio, YTAudioModel} from './yt-audio.types';

const db = connection.useDb('yt-converter');

ytAudioSchema.index({name: 'text', description: 'text'});
ytAudioSchema.pre('save', async function () {
  await preSaveDoc(this);
});
ytAudioSchema.pre('findOneAndUpdate', async function () {
  await preUpdateAudio(
    this.model,
    this.getQuery(),
    this.getUpdate() as UpdateQuery<IYTAudio>
  );
});

ytAudioSchema.post('findOneAndDelete', async function (doc: IYTAudio) {
  await postDeleteAudio(doc);
});

const YTAudio = (db.models.YTAudio ||
  db.model('YTAudio', ytAudioSchema)) as YTAudioModel;

export default YTAudio;
