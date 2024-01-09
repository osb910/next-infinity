import {NextRequest, NextResponse} from 'next/server';
import {getOneObject} from '@/lib/s3';
import {readFile} from '@/utils/file';

export const GET = async (
  req: NextRequest,
  {params}: {params: {key: string}}
) => {
  try {
    const s3File = await getOneObject(`next-stores/${params.key}`);
    const file = s3File?.data
      ? s3File
      : await readFile(
          `../public/uploads/next-stores/${params.key}`,
          undefined,
          '../public/uploads/store.png'
        );
    if (!file.data) {
      const err = new Error('Something went wrong!');
      throw err;
    }
    const response = new NextResponse(
      s3File?.data ? file?.data?.transformToWebStream() : file?.data
    );
    response.headers.set('content-type', `image/${file.ext}`);
    return response;
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err);
    return NextResponse.json(
      {status: 'error', message: err.message},
      {status: 500}
    );
  }
};
