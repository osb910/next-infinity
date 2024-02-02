import type {ReactNode, ComponentProps, MouseEvent} from 'react';
import {type AnimationProps, motion, type MotionProps} from 'framer-motion';
import useSound from 'use-sound';
import useSoundEnabled from '../SoundToggler/sound-enabled';
import styles from './IconButton.module.css';

export type IconButtonProps = ComponentProps<'button'> &
  MotionProps &
  AnimationProps & {
    icon: JSX.Element;
    noSfx?: boolean;
    children?: ReactNode;
    highlightDeps?: any[];
  };

const IconButton = ({
  icon,
  noSfx = false,
  children,
  highlightDeps,
  ...delegated
}: IconButtonProps) => {
  const {soundEnabled} = useSoundEnabled();
  const sfxOn = noSfx || soundEnabled;
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
    duration: 0.1,
    bounce: 0.3,
    ...delegated.transition,
  };

  return (
    // @ts-ignore
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
