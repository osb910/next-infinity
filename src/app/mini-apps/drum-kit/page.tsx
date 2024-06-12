'use client';

import {useEffect} from 'react';
import useSoundEnabled from '@/ui/SfxSwitch/sound-enabled';
import DrumButton from './DrumButton';
import styles from './page.module.css';
import useSound from 'use-sound';
import useHotKeys from '@/hooks/useHotkeys';
import {useImmer} from 'use-immer';

export type KeyStatuses = {
  [key: string]: {
    active: boolean;
    duration: number;
  };
};

type SoundProps = {
  key: string;
  sound: string;
  play: any;
  length: any;
};

const DrumKit = () => {
  const {soundEnabled} = useSoundEnabled();
  const keySoundsMap: SoundProps[] = [
    {
      key: 'A',
      play: useSound(`/sfx/clap.wav`, {soundEnabled})[0],
      length: useSound(`/sfx/clap.wav`, {soundEnabled})[1].duration,
      sound: 'clap',
    },
    {
      key: 'S',
      play: useSound(`/sfx/hihat.wav`, {soundEnabled})[0],
      length: useSound(`/sfx/hihat.wav`, {soundEnabled})[1].duration,
      sound: 'hihat',
    },
    {
      key: 'D',
      play: useSound(`/sfx/kick.wav`, {soundEnabled})[0],
      length: useSound(`/sfx/kick.wav`, {soundEnabled})[1].duration,
      sound: 'kick',
    },
    {
      key: 'F',
      play: useSound(`/sfx/openhat.wav`, {soundEnabled})[0],
      length: useSound(`/sfx/openhat.wav`, {soundEnabled})[1].duration,
      sound: 'openhat',
    },
    {
      key: 'G',
      play: useSound(`/sfx/boom.wav`, {soundEnabled})[0],
      length: useSound(`/sfx/boom.wav`, {soundEnabled})[1].duration,
      sound: 'boom',
    },
    {
      key: 'H',
      play: useSound(`/sfx/ride.wav`, {soundEnabled})[0],
      length: useSound(`/sfx/ride.wav`, {soundEnabled})[1].duration,
      sound: 'ride',
    },
    {
      key: 'J',
      play: useSound(`/sfx/snare.wav`, {soundEnabled})[0],
      length: useSound(`/sfx/snare.wav`, {soundEnabled})[1].duration,
      sound: 'snare',
    },
    {
      key: 'K',
      play: useSound(`/sfx/tom.wav`, {soundEnabled})[0],
      length: useSound(`/sfx/tom.wav`, {soundEnabled})[1].duration,
      sound: 'tom',
    },
    {
      key: 'L',
      play: useSound(`/sfx/tink.wav`, {soundEnabled})[0],
      length: useSound(`/sfx/tink.wav`, {soundEnabled})[1].duration,
      sound: 'tink',
    },
  ];

  const [status, setStatus] = useImmer<KeyStatuses>({});

  useEffect(() => {
    keySoundsMap.forEach(({key, length}) => {
      setStatus((draft) => {
        draft[key] = {active: false, duration: length};
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hotkeys = keySoundsMap.map(({key, play, length}) => ({
    hotKey: `Key${key}`,
    run: () => {
      if (!soundEnabled) return;
      play();
      setStatus((draft) => {
        draft[key] = {active: true, duration: length + Math.random() * 10};
      });
    },
    universal: true,
  }));
  useHotKeys(hotkeys);

  return (
    <main className={styles.main}>
      <section className={styles.keys}>
        {keySoundsMap.map(({key, sound, play, length}) => (
          <DrumButton
            key={`${key} ${status[key]?.duration ?? length}`}
            keyButton={key}
            play={play}
            sound={sound}
            keyStatus={status[key]}
            setStatus={setStatus}
            soundEnabled={soundEnabled}
            length={length}
          />
        ))}
      </section>
    </main>
  );
};

export default DrumKit;
