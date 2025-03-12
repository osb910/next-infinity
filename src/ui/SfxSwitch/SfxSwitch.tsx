'use client';

import {Volume2, VolumeX} from 'react-feather';
import useSfx from './useSfx';
import IconButton, {type IconButtonProps} from '@/ui/IconButton';
import VisuallyHidden from '@/ui/VisuallyHidden';
import type {MouseEvent, ReactElement, ReactNode} from 'react';

export interface SfxSwitchProps extends Partial<IconButtonProps> {
  sfxOnIcon?: ReactElement;
  sfxOffIcon?: ReactElement;
  dir?: string;
  children?: ReactNode;
}

export const SfxSwitch = ({
  sfxOnIcon = <Volume2 />,
  sfxOffIcon = <VolumeX />,
  dir,
  children,
  ...delegated
}: SfxSwitchProps) => {
  const {soundEnabled, toggleSound} = useSfx();

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
