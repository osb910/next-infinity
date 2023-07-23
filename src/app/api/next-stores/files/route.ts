import {NextResponse} from 'next/server';
import {FileMetaData, getOneObject, listFileObjects} from '@/lib/s3';
import {compress} from '@/lib/zip';

// Get all file Objects
export const GET = async () => {
  try {
    const [fileList] = (await listFileObjects()) ?? [];
    if (!fileList || !fileList.length) {
      const err = new Error('Something went wrong!');
      throw err;
    }

    const promises = fileList.map(async (file: FileMetaData) => ({
      ...file,
      buffer: await (
        await getOneObject(file.key!)
      )?.data?.transformToByteArray(),
    }));

    const res = await Promise.all(promises);
    if (!res || !res.length) {
      const err = new Error('Something went wrong!');
      throw err;
    }

    const zipped = await compress(res);

    if (!zipped) {
      const err = new Error('Something went wrong!');
      throw err;
    }

    const response = new NextResponse(zipped);
    response.headers.set('content-type', 'application/zip');
    // const stat = statSync(getPath('../public/uploads/next-infinity.zip'));
    // response.headers.set('content-length', stat.size.toString());
    response.headers.set(
      'content-disposition',
      'attachment; filename="next-infinity.zip"'
    );

    return response;
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err);
    return {
      status: 'error',
      message: err.message,
    };
  }
};
