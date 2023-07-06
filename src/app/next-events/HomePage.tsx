import EventItem from '@/components/events/EventItem';
import {IEvent} from './Event.model';
import styles from './page.module.css';
import {getURL} from '@/utils/path';
import NewsletterRegistration from '@/components/events/input/NewsletterRegistration';

const HomePage = async () => {
  try {
    const res = await fetch(getURL('/api/events/featured'), {
      next: {revalidate: 1800}, // 30 minutes
    });
    const events: IEvent[] = await res.json();
    return (
      <section>
        <NewsletterRegistration />
        <ul className={styles.list}>
          {events.map(item => (
            <EventItem
              key={item._id?.toString()}
              {...item}
              id={item._id?.toString()}
            />
          ))}
        </ul>
      </section>
    );
  } catch (err) {
    console.log(err);
  }
};

export default HomePage;
