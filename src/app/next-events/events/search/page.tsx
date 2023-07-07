// 'use client';

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
// import {useEffect, useState} from 'react';
// import Spinner from '@/components/Spinner/Spinner';

interface FilteredEventsProps {
  searchParams: {[key: string]: string};
}

export const metadata: Metadata = {
  title: 'Search Events',
  description: 'A list of filtered events',
};

const FilteredEvents = async ({searchParams}: FilteredEventsProps) => {
  const {year, month} = searchParams;
  // const [results, setResults] = useState<
  // IEvent[] | {error: string; status: number}
  // >([]);
  // const [isLoading, setIsLoading] = useState(false);
  // useEffect(() => {
  // (async () => {
  // setIsLoading(true);
  try {
    await dbConnectNextEvents();
    const res = await fetch(getURL('/api/events/search'), {
      cache: 'no-store',
      method: 'POST',
      body: JSON.stringify(searchParams),
      headers: {'Content-Type': 'application/json'},
    });
    const data: IEvent[] | {error: string; status: number} = await res.json();
    // setResults(data);
    // setIsLoading(false);
    // })();
    // }, [searchParams]);
    if (Object.keys(searchParams).length === 0) return <EventsSearch />;
    return (
      <>
        <EventsSearch />
        {/* {isLoading && <Spinner />} */}
        {'error' in data ? (
          <>
            <ErrorAlert>{data.error}</ErrorAlert>
            <div className='center'>
              <ButtonLink link='/next-events/events'>
                Show All Events
              </ButtonLink>
            </div>
          </>
        ) : (
          <>
            <ResultsTitle date={new Date(+year, +month - 1)} />
            <ul className={styles.list}>
              {data.map(item => (
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
  } catch (err) {
    console.log(err);
  }
};

export default FilteredEvents;
