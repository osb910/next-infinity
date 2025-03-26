// import {getModelQuery} from '@/services/services.lib';
// import {getP8n} from '@/lib/helpers';
import {Types} from 'mongoose';
import YTAudio from './yt-audio.model';
import {convertToAudio} from '@/lib/video-to-audio';
import {getObject, uploadObject} from '@/lib/files/s3';
import {stripArDiacritics} from '@/lib/text/regex/ar-regex';
import {getModelQuery} from '../lib';
import {deleteFile, readFile} from '@/utils/file';
import type {IYTAudio} from './yt-audio.types';
import type {HDoc} from '@/types';
import {NextRequest} from 'next/server';

export const createYTAudio = async ({
  url,
  format,
}: {
  url: string;
  format?: 'mp3' | 'wav';
}): Promise<unknown> => {
  try {
    const convertedAudio = await convertToAudio({
      videoUrl: url,
      format: format || 'mp3',
    });

    const audioFile = await readFile(convertedAudio.audioUrl);
    const originalTitle = convertedAudio.title;
    const slug = stripArDiacritics(originalTitle)
      .replace(/[:<>\/\\*+~.()'"!@|]/g, '')
      .replace(/^\s+|\s+$/g, '')
      .replace(/\s+/g, '_');
    const originalName = `${originalTitle}.${format}`;
    const fileTitle = `${new Types.ObjectId()}_${slug}`;
    const fileName = `${fileTitle}.${format}`;

    // Upload to S3
    const uploadedFile = await uploadObject(
      `yt-converter/${fileName}`,
      audioFile.data as Buffer
    );

    if (!uploadedFile || uploadedFile.$metadata.httpStatusCode !== 200) {
      const err = new Error('File upload failed');
      throw err;
    }

    const storedFile = await getObject(`yt-converter/${fileName}`);
    const sizeKB = (storedFile?.size ?? 0) / 1024;
    const sizeMB = sizeKB / 1024;
    const sizeGB = sizeMB / 1024;
    const readableSize =
      sizeKB < 1024
        ? `${sizeKB.toFixed(2)}kb`
        : sizeMB < 1024
        ? `${sizeMB.toFixed(2)}mb`
        : `${sizeGB.toFixed(2)}gb`;

    deleteFile(convertedAudio.audioUrl);

    const ytAudio = new YTAudio({
      title: originalTitle,
      slug,
      description: convertedAudio.description,
      audio: {
        key: storedFile?.key,
        title: fileTitle,
        fileName,
        originalName,
        ext: storedFile?.ext,
        // mimeType: createdAudio?.mimetype,
        size: storedFile?.size,
        readableSize,
      },
      video: {
        url: convertedAudio.videoUrl,
        videoId: convertedAudio.videoId,
        likes: convertedAudio.likes,
        viewCount: convertedAudio.viewCount,
        publishDate: convertedAudio.publishDate,
        uploadDate: convertedAudio.uploadDate,
        lengthSeconds: convertedAudio.lengthSeconds,
      },
      channel: {
        id: convertedAudio.channelId,
        name: convertedAudio.channelName,
        profileUrl: convertedAudio.ownerProfileUrl,
        subscriberCount: convertedAudio.subscriberCount,
        url: convertedAudio.audioUrl,
        username: convertedAudio.username,
      },
    });

    const doc = (await ytAudio.save()) as HDoc<IYTAudio>;
    return {
      data: doc,
      status: 'success',
      message: `Successfully converted "${doc.title}" video to ${format}.`,
      code: 201,
    };
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err);
    throw err;
  }
};

// export const getYTAudio = async (
//   storeParam: string
// ): Promise<{
//   status: string;
//   message: string;
//   code: number;
//   data?: any;
// }> => {
//   const storeQuery = getModelQuery(storeParam);
//   try {
//     const store = (await Store.findOne(storeQuery)) as IStore & {
//       _doc: IStore;
//     };
//     if (!store) {
//       return {
//         status: 'error',
//         message: `No store found with id or slug ${storeParam}`,
//         code: 404,
//       };
//     }
//     let reviews = (await Review.find({store: store._id}).sort({
//       updatedAt: -1,
//     })) as Array<HydratedDocument<IReview>>;
//     reviews = await Promise.all(
//       reviews.map(async (r) => {
//         let user = (await User.findById(
//           r.author,
//           '-password -resetPasswordToken -resetPasswordExpires -__v'
//         )) as
//           | any
//           | (HydratedDocument<IUser> & {
//               _doc: IUser;
//             });
//         user = {
//           ...user._doc,
//           gravatar: await user.gravatar,
//         };
//         return {
//           // @ts-ignore
//           ...r._doc,
//           author: user,
//         };
//       })
//     );
//     return {
//       status: 'success',
//       code: 200,
//       message: `Successfully fetched store!`,
//       data: {
//         ...store._doc,
//         reviews,
//       },
//     };
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// };

export const updateAudio = async (req: NextRequest, storeParam: string) => {
  // const userId = req.headers.get('x-user-id');
  const storeQuery = getModelQuery(storeParam);
  try {
    // const audio = (await YTAudio.findOne(storeQuery)) as IYTAudio;
    // if (audio.author.toString() !== userId) {
    //   return {
    //     status: 'error',
    //     message: 'You are not the author of this audio!',
    //     code: 400,
    //   };
    // }
    const data = await req.json();
    const {name, description, address, lat, lng} = data;

    // const file =
    //   data.url &&
    //   (await processUploadFile(body, {field: 'photo', folder: 'next-stores'}));

    const update = {
      name,
      description,
      location: {
        type: 'Point',
        coordinates: [+lng, +lat],
        address,
      },
      // ...(file && {
      //   photo: {
      //     key: file?.fileName,
      //     title: file?.title,
      //     ext: file?.ext,
      //     mimeType: file?.mimetype,
      //     size: file?.size,
      //     readableSize: file?.readableSize,
      //   },
      // }),
    };

    const res = (await YTAudio.findOneAndUpdate(storeQuery, update, {
      new: true,
      runValidators: true,
    })) as HDoc<IYTAudio>;

    if (!res) {
      return {
        status: 'error',
        message: 'Something went wrong',
        code: 500,
      };
    }
    return {
      status: 'success',
      code: 201,
      message: `Successfully updated ${res.title}!`,
      data: res._doc,
    };
  } catch (err) {
    console.error(err);
    return {
      status: 'error',
      message: (err as Error).message,
      code: 500,
    };
  }
};

export const deleteAllAudios = async (): Promise<unknown> => {
  try {
    const res = await YTAudio.deleteMany({});
    if (!res) {
      const err = new Error('Something went wrong!');
      throw err;
    }
    return {
      status: 'success',
      message: `Successfully deleted all audios!`,
      code: 200,
    };
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err);
    throw err;
  }
};
