import EventSummary from '@/components/events/event-detail/EventSummary';
import EventLogistics from '@/components/events/event-detail/EventLogistics';
import EventContent from '@/components/events/event-detail/EventContent';
import ErrorAlert from '@/components/ErrorAlert/ErrorAlert';
import {getURL} from '@/utils/path';
import Comments from '@/components/events/input/Comments';
import {AppPage, GetMetadata} from '@/types';

type Params = {
  event: string;
};

type EventPg = AppPage<Params>;
type GenEventMeta = GetMetadata<Params>;

// export const dynamic = 'force-dynamic';

export const generateMetadata: GenEventMeta = async ({params}) => {
  const {event} = await params;
  const res = await fetch(getURL(`/api/events/${event}`), {
    headers: {
      'User-Agent': '*',
      Accept: 'application/json',
    },
  });
  const json = await res.json();
  if (json.error) return {title: json.error, description: json.error};
  const {title, description} = json;

  return {
    title,
    description,
  };
};

const EventDetail: EventPg = async ({params}) => {
  try {
    const {event} = await params;
    console.log('[event] page', event);
    const res = await fetch(getURL(`/api/events/${event}`), {
      headers: {
        'User-Agent': '*',
        Accept: 'application/json',
      },
    });
    const json = await res.json();
    if (json.status === 'error') return <ErrorAlert>{json.message}</ErrorAlert>;
    const {title, description, location, date, image} = json.data;
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
          comments={json.data.comments}
          event={event}
        />
      </>
    );
  } catch (err) {
    console.log(err);
  }
};

export default EventDetail;
