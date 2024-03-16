'use client';

import {useEffect} from 'react';
import useTimers, {
  type Timer as TimerProps,
} from '@/store/next-timer/useTimers';
import useTimer from '@/hooks/useTimer';
import Card from '@/ui/Card';
import cls from './Timer.module.css';

const Timer = ({name, duration}: TimerProps) => {
  const {isRunning, changeStatus} = useTimers();
  const {timeLeft, status} = useTimer({duration, isRunning});

  useEffect(() => {
    changeStatus(name, status);
  }, [name, status, changeStatus]);

  const formattedTime = (timeLeft / 1000).toFixed(2);
  return (
    <Card>
      <h2>{name}</h2>
      <p>
        <progress max={duration * 1000} value={timeLeft} />
      </p>
      <p className={cls.time}>{formattedTime}</p>
    </Card>
  );
};

export default Timer;
