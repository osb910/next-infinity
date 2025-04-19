'use client';
import type {
  ReactNode,
  MouseEvent,
  ReactElement,
  ComponentPropsWithRef,
} from 'react';
import {
  motion,
  type MotionProps,
  type TargetAndTransition,
} from 'framer-motion';
import useSound from 'use-sound';
import clsx from 'clsx';
import useSfx from '@/ui/SfxSwitch/useSfx';
import cls from './IconButton.module.css';

export type IconButtonProps = ComponentPropsWithRef<'button'> &
  Partial<MotionProps> & {
    icon: ReactElement;
    noSfx?: boolean;
    children?: ReactNode;
    highlightDeps?: Array<unknown>;
  };

export const IconButton = ({
  icon,
  noSfx = false,
  children,
  highlightDeps,
  onMouseDown,
  onMouseUp,
  whileHover: userWhileHover,
  whileFocus: userWhileFocus,
  whileTap: userWhileTap,
  transition: userTransition,
  ...rest
}: IconButtonProps) => {
  const {soundEnabled} = useSfx();
  const sfxOn = !noSfx && soundEnabled;
  const [playActive] = useSound('/sfx/pop-down.mp3', {
    soundEnabled: sfxOn,
    volume: 0.25,
  });
  const [playOn] = useSound('/sfx/pop-up-on.mp3', {
    soundEnabled: sfxOn,
    volume: 0.25,
  });
  // Combine default animations with user-provided ones
  const whileHover = {
    scale: 1.1,
    ...(userWhileHover as TargetAndTransition),
  };

  const whileFocus = {
    scale: 1.1,
    ...(userWhileFocus as TargetAndTransition),
  };

  const whileTap = {
    scale: 0.95,
    ...(userWhileTap as TargetAndTransition),
  };

  const transition = {
    type: 'spring',
    damping: 25,
    stiffness: 280,
    restDelta: 0.01,
    ...userTransition,
  };

  // Event handlers with sound effects
  const handleMouseDown = (evt: MouseEvent<HTMLButtonElement>) => {
    onMouseDown?.(evt);
    playActive();
  };

  const handleMouseUp = (evt: MouseEvent<HTMLButtonElement>) => {
    onMouseUp?.(evt);
    playOn();
  };

  return (
    <motion.button
      type='button'
      key={highlightDeps?.join('')}
      {...rest}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      whileHover={whileHover}
      whileFocus={whileFocus}
      whileTap={whileTap}
      transition={transition}
      className={clsx(rest.className, cls.button)}
    >
      <span>{icon}</span>
      {children}
    </motion.button>
  );
};

export default IconButton;
