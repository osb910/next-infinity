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
  params: {
    slug: string[];
  };
  searchParams: {[key: string]: string};
}

export const metadata: Metadata = {
  title: 'Search Events',
  description: 'A list of filtered events',
};

const FilteredEvents = async ({searchParams}: FilteredEventsProps) => {
  if (Object.keys(searchParams).length === 0) return <EventsSearch />;
  const {year, month} = searchParams;
  await dbConnectNextEvents();
  const res = await fetch(
    getURL(`/api/events/search?year=${year}&month=${month}`),
    {cache: 'no-store'}
  );
  const data: IEvent[] | {error: string; status: number} = await res.json();
  return (
    <>
      <EventsSearch />
      {'error' in data ? (
        <>
          <ErrorAlert>{data.error}</ErrorAlert>
          <div className='center'>
            <ButtonLink link='/events'>Show All Events</ButtonLink>
          </div>
        </>
      ) : (
        <>
          <ResultsTitle date={new Date(+year, +month - 1)} />
          <ul className={styles.list}>
            {data.map((item: IEvent) => (
              <EventItem
                key={item._id?.toString()}
                {...item}
                id={item._id?.toString()}
              />
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default FilteredEvents;
