'use client';

import {useState, useEffect} from 'react';
import useSound from 'use-sound';
import useSfx from '@/ui/SfxSwitch/useSfx';

export interface UseTimeProps {
  showTime?: boolean;
  tickEvery?: number;
  tickSound?: boolean;
  tickPath?: string;
}

const useTime = ({
  showTime = true,
  tickEvery = 1000,
  tickSound = false,
  tickPath = '/sfx/single-tick.mp3',
}: UseTimeProps = {}) => {
  const [time, setTime] = useState<Date | null>(null);
  const {soundEnabled} = useSfx();
  const [playTick] = useSound(tickPath, {
    soundEnabled,
    volume: 0.5,
  });
  useEffect(() => {
    if (!showTime) return;
    setTime(new Date());
  }, [showTime]);

  useEffect(() => {
    if (!showTime || !time) return;
    const intervalId = window.setInterval(() => {
      setTime(new Date());
      if (tickSound) playTick();
    }, tickEvery);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [time, showTime, tickEvery, tickSound, playTick]);

  return time;
};

export default useTime;
