import {useEffect, useState} from 'react';

const useStopwatch = (
  isRunning: boolean,
  {
    every = 1,
    start = 0,
  }: {
    every?: number;
    start?: number;
  } = {}
) => {
  const [timeElapsed, setTimeElapsed] = useState(start);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(
      () => setTimeElapsed(current => current + every),
      every * 1000
    );
    return () => clearInterval(interval);
  }, [isRunning, every]);

  const inHr = timeElapsed / (60 * 60);
  const hr = Math.floor(inHr);
  const inMin = (inHr - hr) * 60;
  const min = Math.floor(inMin);
  const inSec = (inMin - min) * 60;
  const sec = Math.floor(inSec);
  const ms = timeElapsed * 1000;

  const reset = () => setTimeElapsed(0);

  return {
    watch: {
      timeElapsed,
      hr,
      min,
      sec,
      ms,
    },
    reset,
  };
};

export default useStopwatch;
