import ResultsTitle from '@/components/events/ResultsTitle';
import ButtonLink from '@/components/ButtonLink/ButtonLink';
import ErrorAlert from '@/components/ErrorAlert/ErrorAlert';
import EventItem from '@/components/events/EventItem';
import {IEvent} from '../../../../services/next-events/event/event-model';
import EventsSearch from '@/components/events/EventsSearch';
import styles from './Search.module.css';
import {Metadata} from 'next';
import {getURL} from '@/utils/path';
import {AppPage} from '@/types';

type SearchParams = {
  type: 'any' | 'upcoming' | 'past';
  [key: string]: string;
};

type SearchPage = AppPage<unknown, SearchParams>;

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Search Events',
  description: 'A list of filtered events',
};

const FilteredEvents: SearchPage = async ({searchParams}) => {
  const {year, month, type, q} = await searchParams;
  if (!year && !month && !type && !q) return <EventsSearch />;
  try {
    const res = await fetch(getURL('/api/events/search'), {
      method: 'POST',
      body: JSON.stringify({year, month, type, q}),
      headers: {'Content-Type': 'application/json'},
    });
    const json = await res.json();
    if (json.status === 'error')
      return (
        <>
          <EventsSearch
            year={year}
            month={month}
            type={type}
            q={q}
          />
          <ErrorAlert>{json.message}</ErrorAlert>
          <div className='center'>
            <ButtonLink link='/next-events/events'>Show All Events</ButtonLink>
          </div>
        </>
      );
    const {data: events, count} = json;
    return (
      <>
        <EventsSearch
          year={year}
          month={month}
          type={type}
          q={q}
        />
        <ResultsTitle
          filters={{year, month, type, query: q}}
          count={count}
        />
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
    if (!(err instanceof Error)) return;
    console.error(err);
  }
};

export default FilteredEvents;
