import EventContent from '@/components/events/event-detail/EventContent';
import EventLogistics from '@/components/events/event-detail/EventLogistics';
import EventSummary from '@/components/events/event-detail/EventSummary';

function EventLoading() {
  return (
    <>
      <EventSummary isPlaceholder />
      <EventLogistics isPlaceholder />
      <EventContent isPlaceholder>
        <p>Placeholder</p>
      </EventContent>
    </>
  );
}

export default EventLoading;
