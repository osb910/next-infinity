'use client';

import {useEffect, useRef, useState} from 'react';

type UseTimerProps = {
  duration?: number;
  isRunning?: boolean;
  tickEvery?: number;
};

const useTimer = ({
  duration = 10,
  isRunning = false,
  tickEvery = 50,
}: UseTimerProps = {}) => {
  const timerInterval = useRef<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(duration * 1000);
  const [status, setStatus] = useState<'stopped' | 'running' | 'paused'>(
    'stopped'
  );

  if (timeLeft <= 0 && timerInterval.current) {
    clearInterval(timerInterval.current!);
    setTimeLeft(duration * 1000);
    setStatus('stopped');
  }

  useEffect(() => {
    if (!isRunning) {
      clearInterval(timerInterval.current!);
      return setStatus('paused');
    }
    setStatus('running');
    const interval = setInterval(() => {
      setTimeLeft((current) => (current > 0 ? current - tickEvery : current));
    }, tickEvery);

    timerInterval.current = +interval;

    return () => clearInterval(interval);
  }, [isRunning, tickEvery]);

  return {timeLeft, status};
};

export default useTimer;
