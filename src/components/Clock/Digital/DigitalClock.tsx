'use client';
import {memo} from 'react';
import format from 'date-fns/format';
import useTime from '@/components/use-time';
import Spinner from '@/components/Spinner';
import styles from './Clock.module.css';

export interface ClockProps {
  tickEvery: number;
  locale?: string;
  timeStyle?: 'short' | 'medium' | 'long' | 'full';
}

const Clock = ({tickEvery, locale, timeStyle = 'short'}: ClockProps) => {
  const time = useTime({tickEvery});
  if (!time) return <Spinner />;

  const timeDisplay = locale
    ? new Intl.DateTimeFormat(locale, {timeStyle}).format(time)
    : format(time, 'hh:mm:ss a');

  return (
    <time
      dateTime={time.toISOString()}
      className={styles.clock}
      onClick={() => navigator.clipboard.writeText(timeDisplay)}
    >
      {timeDisplay}
    </time>
  );
};

export default memo(Clock);
