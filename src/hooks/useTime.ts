'use client';

import {useState, useEffect} from 'react';

interface useTimeProps {
  showTime?: boolean;
  tickEvery?: number;
}

const useTime = ({showTime = true, tickEvery = 1000}: useTimeProps = {}) => {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    if (!showTime) return;
    setTime(new Date());
  }, []);

  useEffect(() => {
    if (!showTime) return;
    const intervalId = window.setInterval(() => {
      setTime(new Date());
    }, tickEvery);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [showTime, tickEvery]);

  return time;
};

export default useTime;
