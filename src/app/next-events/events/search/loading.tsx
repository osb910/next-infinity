import EventItem from '@/components/events/EventItem';
import EventsSearch from '@/components/events/EventsSearch';
import styles from './Search.module.css';

const EventsLoading = () => {
  return (
    <>
      <EventsSearch />
      <ul className={styles.list}>
        <EventItem isPlaceholder />
      </ul>
    </>
  );
};

export default EventsLoading;
