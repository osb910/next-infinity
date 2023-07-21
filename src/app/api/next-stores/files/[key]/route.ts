import {getFile} from '@/lib/s3';
import {NextRequest, NextResponse} from 'next/server';

export const GET = async (
  req: NextRequest,
  {params}: {params: {key: string}}
) => {
  try {
    const fileStream = await getFile(`next-stores/${params.key}`);
    if (!fileStream) {
      const err = new Error('Something went wrong!');
      throw err;
    }
    return new Response(fileStream);
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err);
    return NextResponse.json(
      {status: 'error', message: err.message},
      {status: 500}
    );
  }
};
