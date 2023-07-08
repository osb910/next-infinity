import ResultsTitle from '@/components/events/ResultsTitle';
import ButtonLink from '@/components/ButtonLink/ButtonLink';
import ErrorAlert from '@/components/ErrorAlert/ErrorAlert';
import EventItem from '@/components/events/EventItem';
import {IEvent} from '../../Event.model';
import EventsSearch from '@/components/events/EventsSearch';
import styles from './Search.module.css';
import {Metadata} from 'next';
import {getURL} from '@/utils/path';

interface FilteredEventsProps {
  searchParams: {
    type: 'any' | 'upcoming' | 'past';
    [key: string]: string;
  };
}

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Search Events',
  description: 'A list of filtered events',
};

const FilteredEvents = async ({searchParams}: FilteredEventsProps) => {
  const {year, month, type, q} = searchParams;
  if (Object.keys(searchParams).length === 0) return <EventsSearch />;
  try {
    const res = await fetch(getURL('/api/events/search'), {
      method: 'POST',
      body: JSON.stringify(searchParams),
      headers: {'Content-Type': 'application/json'},
    });
    const {events, count, error} = await res.json();
    if (error) throw new Error(error);
    return (
      <>
        <EventsSearch />
        <ResultsTitle filters={{year, month, type, query: q}} count={count} />
        <ul className={styles.list}>
          {events.map((item: IEvent) => (
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
    console.error(err);
    return (
      <>
        <EventsSearch />
        <ErrorAlert>{(err as Error).message}</ErrorAlert>
        <div className='center'>
          <ButtonLink link='/next-events/events'>Show All Events</ButtonLink>
        </div>
      </>
    );
  }
};

export default FilteredEvents;
