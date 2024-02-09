'use client';

import {Volume2, VolumeX} from 'react-feather';
import useSoundEnabled from './sound-enabled';
import IconButton, {type IconButtonProps} from '@/ui/IconButton';
import VisuallyHidden from '@/ui/VisuallyHidden';
import type {MouseEvent, ReactNode} from 'react';

interface SfxSwitchProps extends Partial<IconButtonProps> {
  sfxOnIcon?: JSX.Element;
  sfxOffIcon?: JSX.Element;
  dir?: string;
  children?: ReactNode;
}

const SfxSwitch = ({
  sfxOnIcon = <Volume2 />,
  sfxOffIcon = <VolumeX />,
  dir,
  children,
  ...delegated
}: SfxSwitchProps) => {
  const {soundEnabled, toggleSound} = useSoundEnabled();

  return (
    <IconButton
      title={soundEnabled ? 'Disable sound effects' : 'Enable sound effects'}
      {...delegated}
      className={`${dir} ${delegated.className ?? ''}`}
      icon={soundEnabled ? sfxOnIcon : sfxOffIcon}
      onClick={(evt: MouseEvent<HTMLButtonElement>) => {
        toggleSound();
        delegated.onClick?.(evt);
      }}
      highlightDeps={[soundEnabled]}
    >
      <VisuallyHidden>
        {soundEnabled ? 'Disable sound effects' : 'Enable sound effects'}
      </VisuallyHidden>
      {children}
    </IconButton>
  );
};

export default SfxSwitch;
