import styles from './EventItem.module.css';
import ButtonLink from '../ButtonLink/ButtonLink';
import DateIcon from '../icons/DateIcon';
import AddressIcon from '../icons/AddressIcon';
import ArrowRightIcon from '../icons/ArrowRightIcon';
import Image from 'next/image';

export interface EventItemProps {
  id?: string;
  title?: string;
  image?: string;
  date?: string;
  location?: string;
  isPlaceholder?: boolean;
}

const EventItem = ({
  title,
  image,
  date,
  location,
  id,
  isPlaceholder,
}: EventItemProps) => {
  if (isPlaceholder)
    return (
      <li className={styles.item}>
        <div className={styles.fakeImage} />
        <section
          style={{
            fontFamily: 'var(--fn-loading)',
          }}
          className={styles.content}
        >
          <h2>PlaceholderTitle</h2>
          <span className={styles.date}>
            <DateIcon />
            <time>PlaceholderDate</time>
          </span>
          <span className={styles.address}>
            <AddressIcon />
            <address>PlaceholderAddress</address>
          </span>
        </section>
        <section
          style={{
            fontFamily: 'var(--fn-loading)',
          }}
          className={styles.actions}
        >
          <ButtonLink link='#'>
            <span>PlaceholderLink</span>
            <span className={styles.icon}>
              <ArrowRightIcon />
            </span>
          </ButtonLink>
        </section>
      </li>
    );
  const readableDate = new Date(date!).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const formattedAddress = location!.replace(', ', '\n');
  const exploreLink = `/next-events/events/${id}`;
  return (
    <li className={styles.item}>
      <Image
        src={'/' + image}
        alt={title!}
        width={256}
        height={160}
      />
      <section className={styles.content}>
        <h2>{title}</h2>
        <span className={styles.date}>
          <DateIcon />
          <time>{readableDate}</time>
        </span>
        <span className={styles.address}>
          <AddressIcon />
          <address>{formattedAddress}</address>
        </span>
      </section>
      <section className={styles.actions}>
        <ButtonLink
          link={exploreLink}
          // prefetch={false}
        >
          <span>Explore Event</span>
          <span className={styles.icon}>
            <ArrowRightIcon />
          </span>
        </ButtonLink>
      </section>
    </li>
  );
};

export default EventItem;
