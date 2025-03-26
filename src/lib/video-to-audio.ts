import ytdl from '@distube/ytdl-core';
import ffmpeg from 'fluent-ffmpeg';

export interface ConversionRequest {
  videoUrl: string;
  format?: 'mp3' | 'wav';
  quality?: 'low' | 'medium' | 'high';
}

export interface ConversionResponse {
  title: string;
  description: string;
  videoId: string;
  likes: number;
  viewCount: number;
  publishDate: Date;
  uploadDate: Date;
  lengthSeconds: number;
  videoUrl: string;
  audioUrl: string;
  channelId: string;
  ownerProfileUrl: string;
  channelUrl: string;
  channelName: string;
  username: string;
  subscriberCount: string;
}

const QUALITY_PRESETS = {
  low: {
    bitrate: 96,
    sampleRate: 22050,
    channels: 1,
  },
  medium: {
    bitrate: 192,
    sampleRate: 44100,
    channels: 2,
  },
  high: {
    bitrate: 320,
    sampleRate: 48000,
    channels: 2,
  },
};

export const convertToAudio = async ({
  videoUrl,
  format = 'mp3',
  quality = 'medium',
}: ConversionRequest): Promise<ConversionResponse> => {
  try {
    // Validate YouTube URL
    if (!ytdl.validateURL(videoUrl)) {
      throw new Error('Invalid YouTube URL');
    }

    // Get video info
    const info = await ytdl.getBasicInfo(videoUrl);
    const {videoDetails} = info;
    const videoTitle = videoDetails.title.replace(/[^\p{L}\s]/giu, '');
    const audioUrl = `./public/uploads/yt-converter/${videoTitle}.${format}`;
    const audioQuality = QUALITY_PRESETS[quality];

    const returnData = {
      ...videoDetails,
      likes: +(videoDetails.likes ?? 0),
      viewCount: +(videoDetails.viewCount ?? 0),
      publishDate: new Date(videoDetails.publishDate),
      uploadDate: new Date(videoDetails.uploadDate),
      lengthSeconds: +videoDetails.lengthSeconds,
      videoUrl: videoDetails.video_url,
      channelName: videoDetails.author.name,
      channelUrl: videoDetails.author.channel_url,
      username: videoDetails.author.user,
      subscriberCount: videoDetails.author.subscriber_count,
      audioUrl,
    };

    return new Promise((resolve, reject) => {
      const audioStream = ytdl(videoUrl, {
        // quality: 'highestaudio',
        filter: 'audio',
      })
        .on('end', () => {
          console.log('Download finished');
        })
        .on('error', (err) => {
          reject(err);
        });

      ffmpeg(audioStream)
        .toFormat(format)
        .audioCodec(format === 'wav' ? 'pcm_s16le' : 'libmp3lame')
        .audioBitrate(audioQuality.bitrate)
        .audioChannels(audioQuality.channels)
        .audioFrequency(audioQuality.sampleRate)
        .outputOptions('-metadata', `title=${videoDetails.title}`)
        .outputOptions('-metadata', `artist=${videoDetails.author.name}`)
        .on('end', () => {
          console.log('Conversion finished');
          resolve(returnData as unknown as ConversionResponse);
        })
        .on('progress', (progress) => {
          console.log(
            `Processing: ${progress.targetSize}kb (${progress.percent}%) done`
          );
        })
        .on('error', (err) => {
          console.error('FFmpeg error:', err);
          reject(err);
        })
        .save(audioUrl);
    });
  } catch (err) {
    console.error({err});
    throw err;
  }
};
