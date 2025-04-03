import {NextRequest, NextResponse} from 'next/server';
import Event, {IEvent} from '@/services/next-events/event/event-model';
import {jsonifyError} from '@/lib/helpers';
import {nextDBConnect} from '@/lib/db';

export const POST = async (req: NextRequest) => {
  try {
    const {year, month, type, q} = await req.json();
    if (
      !year ||
      !month ||
      !type ||
      (year !== 'any' && !(+year >= 2023) && !(+year <= 2030)) ||
      (month !== 'any' && !(+month <= 12) && !(+month >= 1)) ||
      (type !== 'any' && type !== 'upcoming' && type !== 'past')
    ) {
      return NextResponse.json(
        jsonifyError({message: 'Invalid filter values', code: 422}),
        {status: 422}
      );
    }

    const startDate = new Date(`${year}-${month === 'any' ? 1 : month}`);
    const endDate = new Date(
      `${+month === 12 ? +year + 1 : year}-${
        month === 'any' ? 12 : +month === 12 ? 1 : +month + 1
      }`
    );
    const now = new Date();
    const dateFilter =
      year === 'any'
        ? {}
        : {
            date: {
              $gte: startDate.toISOString(),
              $lt: endDate.toISOString(),
            },
          };

    const queryFilter = q
      ? {
          $or: [
            {title: {$regex: q, $options: 'i'}},
            {description: {$regex: q, $options: 'i'}},
            {location: {$regex: q, $options: 'i'}},
          ],
        }
      : {};

    const typeFilter = (event: IEvent) =>
      type === 'upcoming'
        ? event.date > now.toISOString()
        : type === 'past'
        ? event.date < now.toISOString()
        : true;

    const searchFilters = {...dateFilter, ...queryFilter};

    await nextDBConnect({dbName: 'next-events'});

    // const count = await Event.countDocuments(searchFilters);
    const res = (await Event.find(searchFilters).sort({date: 1})).filter(
      typeFilter
    );

    if (!res || res.length === 0) {
      return NextResponse.json(
        jsonifyError({
          message: 'No events found for the chosen filter!',
          code: 404,
        }),
        {status: 404}
      );
    }
    return NextResponse.json(
      {status: 'success', code: 200, data: res, count: res.length},
      {status: 200}
    );
  } catch (err) {
    console.error(err);
  }
};
