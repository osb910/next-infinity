'use client';
import type {ReactNode, MouseEvent, ComponentPropsWithoutRef} from 'react';
import {motion, type MotionProps} from 'framer-motion';
import useSound from 'use-sound';
import useSoundEnabled from '@/ui/SfxSwitch/sound-enabled';
import styles from './IconButton.module.css';

export type IconButtonProps = ComponentPropsWithoutRef<'button'> &
  Partial<MotionProps> & {
    icon: JSX.Element;
    noSfx?: boolean;
    children?: ReactNode;
    highlightDeps?: any[];
  };

export const IconButton = ({
  icon,
  noSfx = false,
  children,
  highlightDeps,
  ...delegated
}: IconButtonProps) => {
  const {soundEnabled} = useSoundEnabled();
  const sfxOn = !noSfx && soundEnabled;
  const [playActive] = useSound('/sfx/pop-down.mp3', {
    soundEnabled: sfxOn,
    volume: 0.25,
  });
  const [playOn] = useSound('/sfx/pop-up-on.mp3', {
    soundEnabled: sfxOn,
    volume: 0.25,
  });
  const whileHover = {
    scale: 1.1,
    ...(delegated.whileHover as Record<string, any>),
  };
  const whileFocus = {
    scale: 1.1,
    ...(delegated.whileFocus as Record<string, any>),
  };
  const whileTap = {
    scale: 0.95,
    ...(delegated.whileTap as Record<string, any>),
  };
  const transition = {
    type: 'spring',
    damping: 30,
    stiffness: 500,
    restDelta: 0.01,
    ...delegated.transition,
  };

  return (
    <motion.button
      type='button'
      key={highlightDeps?.join('')}
      {...delegated}
      onMouseDown={(evt: MouseEvent<HTMLButtonElement>) => {
        delegated.onMouseDown?.(evt);
        playActive();
      }}
      onMouseUp={(evt: MouseEvent<HTMLButtonElement>) => {
        delegated.onMouseUp?.(evt);
        playOn();
      }}
      whileHover={whileHover}
      whileFocus={whileFocus}
      whileTap={whileTap}
      transition={transition}
      className={`${delegated.className ?? ''} ${styles.button}`}
    >
      {icon}
      {children}
    </motion.button>
  );
};

export default IconButton;
