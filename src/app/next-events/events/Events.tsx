import EventsSearch from '@/components/events/EventsSearch';
import EventItem from '@/components/events/EventItem';
import styles from './Events.module.css';
import {IEvent} from '../../../services/next-events/event/event-model';
import {Metadata} from 'next';
import {getURL} from '@/utils/path';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'All Events',
};

const AllEvents = async () => {
  try {
    const res = await fetch(getURL('/api/events'), {
      next: {revalidate: 1800}, // 30 minutes
      headers: {
        'User-Agent': '*',
        Accept: 'application/json',
      },
    });
    const events: IEvent[] = await res.json();

    return (
      <>
        <EventsSearch />
        <ul className={styles.list}>
          {events.map((item) => (
            <EventItem
              key={item._id?.toString()}
              {...item}
              id={item._id?.toString()}
            />
          ))}
        </ul>
      </>
    );
  } catch (err) {
    console.log(err);
  }
};

export default AllEvents;
