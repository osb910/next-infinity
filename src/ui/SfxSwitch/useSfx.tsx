'use client';

import {
  createContext,
  useContext,
  type ReactElement,
  type ReactNode,
} from 'react';
import useSound from 'use-sound';
import {useStoredState} from '@/hooks/useStoredState';
import useUpdateEffect from '@/hooks/useUpdateEffect';

export interface SfxContextProps {
  soundEnabled: boolean;
  toggleSound: () => void;
}

export const SfxContext = createContext<SfxContextProps>({
  soundEnabled: true,
  toggleSound: () => {},
});

export const SfxProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  const [soundEnabled, setSoundEnabled] = useStoredState<boolean>(true, {
    key: 'soundEnabled',
  });
  const [amplify] = useSound('/sfx/activate.mp3', {
    soundEnabled: true,
  });
  const [mute] = useSound('/sfx/abort.mp3', {
    soundEnabled: true,
  });
  useUpdateEffect(() => {
    if (soundEnabled) {
      amplify();
    } else {
      mute();
    }
  }, [soundEnabled, amplify, mute]);

  const toggleSound = (): void => setSoundEnabled((sound) => !sound);

  return (
    <SfxContext.Provider
      value={{
        soundEnabled: soundEnabled ?? true,
        toggleSound,
      }}
    >
      {children}
    </SfxContext.Provider>
  );
};

export const useSfx = () => {
  const data = useContext(SfxContext);

  if (!data)
    throw new Error('Cannot consume Sound context without a SfxProvider');

  return data;
};

export default useSfx;
