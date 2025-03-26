import {Schema} from 'mongoose';
import type {IYTAudio, YTAudioModel} from './yt-audio.types';

const ytAudioSchema = new Schema<IYTAudio, YTAudioModel>(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    slug: String,
    description: {
      type: String,
      trim: true,
    },
    audio: {
      key: String,
      title: String,
      ext: String,
      mimeType: String,
      size: Number,
      readableSize: String,
    },
    video: {
      url: String,
      videoId: String,
      likes: Number,
      viewCount: Number,
      publishDate: Date,
      uploadDate: Date,
      lengthSeconds: Number,
    },
    channel: {
      id: String,
      name: String,
      url: String,
      profileUrl: String,
      subscriberCount: String,
      username: String,
    },
  },
  {
    timestamps: true,
  }
);

export default ytAudioSchema;
