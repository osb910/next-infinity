import ResultsTitle from '@/components/events/ResultsTitle';
import ButtonLink from '@/components/ButtonLink/ButtonLink';
import ErrorAlert from '@/components/ErrorAlert/ErrorAlert';
import EventItem from '@/components/events/EventItem';
import {IEvent} from '../../Event.model';
import EventsSearch from '@/components/events/EventsSearch';
import styles from './page.module.css';
import {Metadata} from 'next';
import {getURL} from '@/utils/path';
import {dbConnectNextEvents} from '../../database';

interface FilteredEventsProps {
  searchParams: {[key: string]: string};
}

export const metadata: Metadata = {
  title: 'Search Events',
  description: 'A list of filtered events',
};

const FilteredEvents = async ({searchParams}: FilteredEventsProps) => {
  const {year, month} = searchParams;
  if (Object.keys(searchParams).length === 0) return <EventsSearch />;
  try {
    // await dbConnectNextEvents();
    const res = await fetch(getURL('/api/events/search'), {
      cache: 'no-store',
      method: 'POST',
      body: JSON.stringify(searchParams),
      headers: {'Content-Type': 'application/json'},
    });
    const results = await res.json();
    if (results.error) throw new Error(results.error);
    return (
      <>
        <EventsSearch />
        <ResultsTitle date={new Date(+year, +month - 1)} />
        <ul className={styles.list}>
          {results.map((item: IEvent) => (
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
