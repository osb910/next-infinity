import {NextRequest, NextResponse} from 'next/server';
import {
  getAllLaunches,
  scheduleNewLaunch,
} from '@/services/nasa-mission-control/launch';
import loadNASAData from '@/services/nasa-mission-control/nasa.middleware';

export const GET = async ({nextUrl: {searchParams}}: NextRequest) => {
  const page = searchParams.get('p');
  const limit = searchParams.get('limit');
  try {
    await loadNASAData();
    const {launches, p8n} = await getAllLaunches(page, limit);
    return NextResponse.json(
      {
        status: 'success',
        code: 200,
        message: 'Launches retrieved',
        ...p8n,
        data: launches,
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

export const POST = async (req: NextRequest) => {
  try {
    const launch = await req.json();
    const {mission, rocket, target, launchDate} = launch;
    if (!mission || !rocket || !launchDate || !target) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Missing required launch property',
          code: 400,
        },
        {status: 400}
      );
    }
    launch.launchDate = new Date(launch.launchDate);
    if (isNaN(launch.launchDate)) {
      return NextResponse.json({
        status: 'error',
        message: 'Invalid launch date',
        code: 400,
      });
    }
    await loadNASAData();
    const doc = await scheduleNewLaunch(launch);
    console.log(doc);
    return NextResponse.json(
      {
        status: 'success',
        message: 'Launch scheduled successfully',
        code: 201,
        data: doc,
      },
      {status: 201}
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
