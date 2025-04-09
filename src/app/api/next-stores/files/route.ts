import {NextResponse} from 'next/server';
import {getObject} from '@/lib/files/s3';
import {readFile} from '@/utils/file';
import {AppRoute} from '@/types';

export const GET: AppRoute = async ({nextUrl: {searchParams}}) => {
  try {
    const key = searchParams.get('key');
    const s3File = await getObject(`next-stores/${key}`);
    const file = s3File?.data
      ? s3File
      : await readFile(`public/uploads/next-stores/${key}`, {
          fallback: 'public/uploads/store.png',
        });
    if (!file.data) {
      const err = new Error('Something went wrong!');
      throw err;
    }
    const responseBody = s3File?.data
      ? s3File?.data?.transformToWebStream()
      : file?.data;
    // @ts-expect-error response error
    const response = new NextResponse(responseBody);
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
