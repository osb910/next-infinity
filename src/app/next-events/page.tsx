import EventItem from '@/components/events/EventItem';
import {Event} from './events/Event.model';
import styles from './page.module.css';

const HomePage = async () => {
  try {
    const res = await fetch(`${process.env.ENDPOINT}/events?featured`, {
      next: {revalidate: 1800}, // 30 minutes
    });
    const events: Event[] = await res.json();
    return (
      <section>
        <ul className={styles.list}>
          {events.map(item => (
            <EventItem key={item._id} {...item} id={item._id} />
          ))}
        </ul>
      </section>
    );
  } catch (err) {
    console.log(err);
  }
};

export default HomePage;
