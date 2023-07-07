import {NextRequest, NextResponse} from 'next/server';
import Event from '@/app/next-events/Event.model';

export const POST = async (req: NextRequest) => {
  try {
    const {year, month} = await req.json();
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
  }
};
