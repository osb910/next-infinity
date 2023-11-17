import {ReactNode, ComponentProps} from 'react';
import {motion} from 'framer-motion';
import useSound from 'use-sound';
import useSoundEnabled from '../SoundToggler/sound-enabled';
import styles from './IconButton.module.css';

export interface IconButtonProps extends ComponentProps<'button'> {
  icon: JSX.Element;
  children?: ReactNode;
  className?: string;
  clickHandler?: Function;
  highlightDeps?: any[];
}

const IconButton = ({
  icon,
  children,
  className,
  clickHandler,
  highlightDeps,
  ...delegated
}: IconButtonProps) => {
  const {soundEnabled} = useSoundEnabled();
  const [playActive] = useSound('/sfx/pop-down.mp3', {
    soundEnabled,
    volume: 0.25,
  });
  const [playOn] = useSound('/sfx/pop-up-on.mp3', {soundEnabled, volume: 0.25});

  return (
    // @ts-ignore
    <motion.button
      className={`${className ?? ''} ${styles.button}`}
      onClick={() => clickHandler?.()}
      onMouseDown={() => playActive()}
      onMouseUp={() => playOn()}
      key={highlightDeps?.join('')}
      whileHover={{scale: 1.1}}
      whileFocus={{scale: 1.1}}
      whileTap={{scale: 0.95}}
      transition={{duration: 0.2, bounce: 0.3}}
      {...delegated}
    >
      {icon}
      {children}
    </motion.button>
  );
};

export default IconButton;
