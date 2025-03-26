import {type NextRequest, NextResponse} from 'next/server';
import {urlValidator} from '@/lib/validators';
import {createYTAudio} from '@/services/yt-converter/yt-audio.controllers';

export const POST = async (req: NextRequest) => {
  try {
    const {url, format} = await req.json();
    if (format && !['mp3', 'wav'].includes(format)) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Invalid format. Please provide a valid format (mp3 | wav).',
          code: 422,
        },
        {status: 422}
      );
    }
    const {validated, errorMap} = urlValidator({url, domain: 'youtube.com'});
    if (errorMap.count)
      return NextResponse.json(
        {
          status: 'error',
          message: 'Invalid input. Please fix any errors and try again.',
          code: 422,
          data: {errors: errorMap},
        },
        {status: 422}
      );
    const json = await createYTAudio({url: validated.url, format});
    return NextResponse.json(json, {status: 200});
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err);
    return NextResponse.json(
      {status: 'error', message: err.message, code: 500},
      {status: 500}
    );
  }
};

// const videoDetails = {
//   isFamilySafe: true,
//   author: {
//     thumbnails: [Array],
//   },
//   thumbnails: [[Object], [Object], [Object], [Object], [Object]],
// };
