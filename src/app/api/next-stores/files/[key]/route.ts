import {getOneObject} from '@/lib/s3';
import {NextRequest, NextResponse} from 'next/server';

export const GET = async (
  req: NextRequest,
  {params}: {params: {key: string}}
) => {
  try {
    let file = await getOneObject(`next-stores/${params.key}`);
    if (!file) {
      const err = new Error('Something went wrong!');
      throw err;
    }
    if (file.code === 'NoSuchKey' && file.statusCode === 404) {
      file = await getOneObject(`next-stores/store.png`);
    }
    const response = new NextResponse(file?.data?.transformToWebStream());
    response.headers.set('content-type', 'image/jpeg');
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
