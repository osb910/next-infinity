import {cache} from 'react';
import {getEvent} from '@/services/next-events/event/controllers';
import EventSummary from '@/components/events/event-detail/EventSummary';
import EventLogistics from '@/components/events/event-detail/EventLogistics';
import EventContent from '@/components/events/event-detail/EventContent';
import ErrorAlert from '@/components/ErrorAlert/ErrorAlert';
import Comments from '@/components/events/input/Comments';
import {AppPage, GetMetadata} from '@/types';
import {getURL} from '@/utils/path';
import {IEvent} from '@/services/next-events/event/event-model';

type Params = {
  event: string;
};

type EventPg = AppPage<Params>;
type GenEventMeta = GetMetadata<Params>;

const fetcher = cache(async (event: string) => await getEvent(event));

export async function generateStaticParams() {
  const res = await fetch(getURL('/api/events'));
  const json = (await res.json()) as Array<IEvent>;

  return json.map((event) => ({
    event: event._id,
  }));
}

export const generateMetadata: GenEventMeta = async ({params}) => {
  const {event} = await params;
  // const res = await fetch(getURL(`/api/events/${event}`), {
  //   headers: {
  //     'User-Agent': '*',
  //     Accept: 'application/json',
  //   },
  // });
  // const json = await res.json();
  const json = await fetcher(event);
  if (json.status === 'error' || !json.data)
    return {title: json.message, description: json.message};
  const {title, description} = json.data;

  return {
    title,
    description,
  };
};

const EventDetail: EventPg = async ({params}) => {
  try {
    const {event} = await params;
    // const res = await fetch(getURL(`/api/events/${event}`), {
    //   headers: {
    //     'User-Agent': '*',
    //     Accept: 'application/json',
    //   },
    // });
    // const json = await res.json();
    const json = await fetcher(event);
    if (json.status === 'error') return <ErrorAlert>{json.message}</ErrorAlert>;
    const eventDoc = json.data;
    if (!eventDoc) return null;
    const {title, description, location, date, image} = eventDoc;
    return (
      <>
        <EventSummary title={title} />
        <EventLogistics
          date={date}
          address={location}
          image={image}
          imageAlt={title}
        />
        <EventContent>
          <p>{description}</p>
        </EventContent>
        <Comments
          comments={eventDoc.comments}
          event={event}
        />
      </>
    );
  } catch (err) {
    console.log(err);
  }
};

export default EventDetail;
