'use client';

import useTimers from '@/store/next-timer/useTimers';
import Timer from '@/components/next-timer/Timer';

const Timers = () => {
  const {timers} = useTimers();

  return (
    <ul>
      {timers.map((timer) => (
        <li key={timer.name}>
          <Timer {...timer} />
        </li>
      ))}
    </ul>
  );
};

export default Timers;
