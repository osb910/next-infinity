import {NextResponse} from 'next/server';
import Event from '@/app/next-events/events/Event.model';

export const GET = async (req: Request) => {
  const {searchParams} = new URL(req.url);
  const year = searchParams.get('year');
  const month = searchParams.get('month');
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
    return NextResponse.json(
      {error: 'Invalid filter values', status: 422},
      {status: 422}
    );
  }

  const filter = {
    date: {
      $regex: `^${year}-0?${month}`,
    },
  };
  try {
    const res = await Event.find(filter);
    if (!res || res.length === 0) {
      return NextResponse.json(
        {error: 'No events found for the chosen filter!', status: 404},
        {status: 404}
      );
    }
    return NextResponse.json(res, {status: 200});
  } catch (err) {
    console.error(err);
    throw err;
  }
};
