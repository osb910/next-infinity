'use client';
import useTime from '@/hooks/useTime';
import {useMemo} from 'react';
import styles from './AnalogClock.module.css';
import {range} from '@/utils/numbers';
import Spinner from '@/components/Spinner/Spinner';

interface AnalogClockProps {}

const AnalogClock = ({}: AnalogClockProps) => {
  const time = useTime({tickEvery: 1000});
  console.log(time);
  const numbers = useMemo(() => [12, ...range(1, 12)], []);
  if (!time) return <Spinner />;
  let hours = time?.getHours() ?? 0;

  const minutes = time?.getMinutes() ?? 0;
  const seconds = time?.getSeconds() ?? 0;
  hours = hours > 12 ? hours - 12 : hours;

  const secondsDegrees = (seconds / 60) * 360 + 90;
  const minutesDegrees = (minutes / 60) * 360 + 90 + (seconds / 60) * 6;
  const hoursDegrees = (hours / 12) * 360 + 90 + (minutes / 60) * 30;
  return (
    <time dateTime={time.toISOString()} className={styles.clock}>
      <div className={styles.clockFace}>
        {numbers.map(number => (
          <span key={number} className={styles.label}>
            {number}
          </span>
        ))}
        <div
          style={{transform: `rotate(${hoursDegrees}deg)`}}
          className={`${styles.hand} ${styles.hour}`}
        >
          <span className={styles.fill}></span>
        </div>
        <div
          style={{transform: `rotate(${minutesDegrees}deg)`}}
          className={`${styles.hand} ${styles.min}`}
        >
          <span className={styles.fill}></span>
        </div>
        <div
          style={{
            transform: `rotate(${secondsDegrees}deg)`,
          }}
          className={`${styles.hand} ${styles.second}`}
        >
          <span
            className={styles.fill}
            style={
              {
                // transform: `rotate(-${secondsDegrees}deg)`,
              }
            }
          ></span>
        </div>
      </div>
    </time>
  );
};

export default AnalogClock;
