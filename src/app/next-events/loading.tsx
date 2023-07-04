import EventItem from '@/components/events/EventItem';
import styles from './page.module.css';

function EventsLoading() {
  return (
    <>
      <ul className={styles.list}>
        <EventItem isPlaceholder />
      </ul>
    </>
  );
}

export default EventsLoading;
