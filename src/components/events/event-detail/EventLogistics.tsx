import styles from './EventLogistics.module.css';
import DateIcon from '@/components/icons/DateIcon';
import AddressIcon from '@/components/icons/AddressIcon';
import LogisticsItem from './LogisticsItem';
import Image from 'next/image';

interface EventLogisticsProps {
  date?: string;
  address?: string;
  image?: string;
  imageAlt?: string;
  isPlaceholder?: boolean;
}

function EventLogistics({
  date,
  address,
  image,
  imageAlt,
  isPlaceholder,
}: EventLogisticsProps) {
  if (isPlaceholder)
    return (
      <section
        className={styles.logistics}
        style={{
          fontFamily: 'var(--font-family-loading)',
        }}
      >
        <div className={styles.fakeImage} />
        <ul className={styles.list}>
          <LogisticsItem icon={DateIcon} key='date'>
            <time>Placeholder</time>
          </LogisticsItem>
          <LogisticsItem icon={AddressIcon} key='address'>
            <address>Placeholder</address>
          </LogisticsItem>
        </ul>
      </section>
    );
  const humanReadableDate = new Date(date!).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const addressText = address!.replace(', ', '\n');

  return (
    <section className={styles.logistics}>
      <div className={styles.image}>
        <Image src={`/${image}`} alt={imageAlt!} width={320} height={320} />
      </div>
      <ul className={styles.list}>
        <LogisticsItem icon={DateIcon}>
          <time>{humanReadableDate}</time>
        </LogisticsItem>
        <LogisticsItem icon={AddressIcon}>
          <address>{addressText}</address>
        </LogisticsItem>
      </ul>
    </section>
  );
}

export default EventLogistics;
