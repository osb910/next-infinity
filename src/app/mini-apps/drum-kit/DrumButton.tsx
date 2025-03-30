'use client';
import {useEffect} from 'react';
import Wrapper from './ButtonWrapper';
// import {KeyStatuses} from './page';

const DrumButton = ({
  keyButton,
  play,
  sound,
  keyStatus,
  setStatus,
  soundEnabled,
  length,
}: {
  keyButton: string;
  play: () => void;
  sound: string;
  keyStatus: {active: boolean; duration: number};
  setStatus: (draft: any) => void;
  soundEnabled: boolean;
  length: any;
}) => {
  useEffect(() => {
    if (!keyStatus?.active) return;
    const timeout = setTimeout(
      () =>
        setStatus((draft: any) => {
          draft[keyButton].active = false;
        }),
      length
    );
    return () => clearTimeout(timeout);
  }, [keyStatus, length, keyButton, setStatus]);
  return (
    <Wrapper
      onClick={() => {
        if (!soundEnabled) return;
        play();
        setStatus((draft: any) => {
          draft[keyButton] = {
            active: true,
            duration: length + Math.random() * 10,
          };
        });
      }}
      className={keyStatus?.active ? 'playing' : ''}
    >
      <kbd>{keyButton}</kbd>
      <span className='sound'>{sound}</span>
    </Wrapper>
  );
};

export default DrumButton;
