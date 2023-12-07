import {NextRequest, NextResponse} from 'next/server';
import {
  getAllLaunches,
  scheduleNewLaunch,
} from '@/models/nasa-mission-control/launch';
import {getPagination} from '@/lib/helpers';
import loadNASAData from '@/models/nasa-mission-control/nasa.middleware';

export const GET = async (req: NextRequest) => {
  const {searchParams} = req.nextUrl;
  const currentPage = searchParams.get('currentPage');
  const perPage = searchParams.get('perPage');
  const {skip, limit, page} = getPagination(currentPage, perPage);
  try {
    await loadNASAData();
    const launches = await getAllLaunches(skip, limit);
    const count = launches.length;
    const pages = Math.ceil(count / limit);
    return NextResponse.json(
      {
        status: 'success',
        code: 200,
        message: 'Launches retrieved',
        count,
        limit,
        page,
        pages,
        previous: page - 1 > 0 ? page - 1 : null,
        next: page + 1 <= pages ? page + 1 : null,
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
