import EventsSearch from '@/components/events/EventsSearch';
import EventItem from '@/components/events/EventItem';
import styles from './page.module.css';
import {IEvent} from '../Event.model';
import {Metadata} from 'next';
import {getURL} from '@/utils/path';

export const metadata: Metadata = {
  title: 'All Events',
};

const AllEvents = async () => {
  try {
    const res = await fetch(getURL('/api/events'), {
      next: {revalidate: 1800}, // 30 minutes
      // cache: 'no-store',
    });
    const events: IEvent[] = await res.json();

    return (
      <>
        <EventsSearch />
        <ul className={styles.list}>
          {events.map(item => (
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
