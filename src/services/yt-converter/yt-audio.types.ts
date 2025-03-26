import type {Model, Types, Document} from 'mongoose';

export interface IYTAudio extends Document<Types.ObjectId> {
  title: string;
  slug: string;
  description: string;
  audio: {
    key: string;
    title: string;
    fileName: string;
    originalName: string;
    ext: string;
    mimeType: string;
    size: number;
    readableSize: string;
  };
  video?: {
    url: string;
    videoId: string;
    likes: number;
    viewCount: number;
    publishDate: Date;
    uploadDate: Date;
    lengthSeconds: number;
  };
  channel?: {
    id: string;
    name: string;
    url: string;
    profileUrl: string;
    subscriberCount: string;
    username: string;
  };
}

export type YTAudioModel = Model<IYTAudio>;
