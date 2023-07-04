'use client';

import useSoundEnabled from '@/components/SoundToggler/sound-enabled';
import {useState, useEffect} from 'react';
import useSound from 'use-sound';

interface useTimeProps {
  showTime?: boolean;
  tickEvery?: number;
  tickSound?: boolean;
}

const useTime = ({
  showTime = true,
  tickEvery = 1000,
  tickSound = false,
}: useTimeProps = {}) => {
  const [time, setTime] = useState<Date | null>(null);
  const {soundEnabled} = useSoundEnabled();
  const [playTick] = useSound('/sfx/single-tick.mp3', {
    soundEnabled,
    volume: 0.5,
  });
  useEffect(() => {
    if (!showTime) return;
    setTime(new Date());
  }, []);

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
