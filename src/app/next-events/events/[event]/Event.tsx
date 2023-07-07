import EventSummary from '@/components/events/event-detail/EventSummary';
import EventLogistics from '@/components/events/event-detail/EventLogistics';
import EventContent from '@/components/events/event-detail/EventContent';
import ErrorAlert from '@/components/ErrorAlert/ErrorAlert';
import {Metadata} from 'next';
import {getURL} from '@/utils/path';
import Comments from '@/components/events/input/Comments';

interface EventDetailProps {
  params: {
    event: string;
  };
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: EventDetailProps): Promise<Metadata> {
  const res = await fetch(getURL(`/api/events/${params.event}`));
  const event = await res.json();
  if (event.error) return {title: event.error, description: event.error};
  const {title, description} = event;

  return {
    title,
    description,
  };
}

const EventDetail = async ({params}: EventDetailProps) => {
  try {
    const res = await fetch(getURL(`/api/events/${params.event}`));
    const event = await res.json();
    if (event.error) return <ErrorAlert>{event.error}</ErrorAlert>;
    const {title, description, location, date, image} = event;
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
        <Comments comments={event.comments} event={params.event} />
      </>
    );
  } catch (err) {
    console.log(err);
  }
};

export default EventDetail;
