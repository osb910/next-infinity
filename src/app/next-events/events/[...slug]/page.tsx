import Spinner from '@/components/Spinner/Spinner';
import ResultsTitle from '@/components/events/ResultsTitle';
import ButtonLink from '@/components/ButtonLink/ButtonLink';
import ErrorAlert from '@/components/ErrorAlert/ErrorAlert';
import EventItem from '@/components/events/EventItem';
import {Event} from '../Event.model';
import EventsSearch from '@/components/events/EventsSearch';
import styles from './page.module.css';
import {Metadata} from 'next';

interface FilteredEventsProps {
  params: {
    slug: string[];
  };
}

export const metadata: Metadata = {
  title: 'Search Events',
  description: 'A list of filtered events',
};

const FilteredEvents = async ({params}: FilteredEventsProps) => {
  if (!params.slug) return <Spinner />;
  const [year, month] = params.slug;
  const res = await fetch(
    `${process.env.ENDPOINT}/events/search?year=${year}&month=${month}`,
    {
      next: {revalidate: 0},
    }
  );
  const data: Event[] | {error: string; status: number} = await res.json();
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
            {data.map((item: Event) => (
              <EventItem key={item._id} {...item} id={item._id} />
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default FilteredEvents;