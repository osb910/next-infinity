import {NextRequest, NextResponse} from 'next/server';
import Event from '@/app/next-events/Event.model';

export const GET = async (req: NextRequest) => {
  const {searchParams} = req.nextUrl;
  const year = searchParams.get('year');
  const month = searchParams.get('month');
  console.log({year, month});
  if (
    !year ||
    !month ||
    isNaN(+year) ||
    isNaN(+month) ||
    +month > 12 ||
    +month < 1 ||
    +year < 2021 ||
    +year > 2030
  ) {
    throw new Error('Invalid filter values');
  }

  const filter = {
    date: {
      $regex: `^${year}-0?${month}`,
    },
  };
  try {
    const res = await Event.find(filter);
    console.log({res});
    if (!res || res.length === 0) {
      return NextResponse.json(
        {error: 'No events found for the chosen filter!', status: 404},
        {status: 404}
      );
    }
    return NextResponse.json(res, {status: 200});
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {error: (err as Error).message, status: 422},
      {status: 422}
    );
  }
};
