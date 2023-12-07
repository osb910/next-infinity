import {
  abortLaunchById,
  getLaunchById,
} from '@/models/nasa-mission-control/launch';
import loadNASAData from '@/models/nasa-mission-control/nasa.middleware';
import {NextRequest, NextResponse} from 'next/server';

type Params = {params: {launchId: string}};
export const DELETE = async (
  req: NextRequest,
  {params: {launchId}}: Params
) => {
  try {
    await loadNASAData();
    const existingLaunch = await getLaunchById(+launchId);
    if (!existingLaunch) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Launch not found',
          code: 404,
        },
        {status: 404}
      );
    }

    const aborted = await abortLaunchById(+launchId);
    if (!aborted) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Launch not aborted',
          code: 400,
        },
        {status: 400}
      );
    }

    return NextResponse.json(
      {
        status: 'success',
        message: 'Launch aborted successfully',
        code: 200,
        data: null,
      },
      {status: 200}
    );
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err.message);
    return NextResponse.json(
      {
        status: 'error',
        message: err.message,
        code: 500,
      },
      {status: 500}
    );
  }
};
