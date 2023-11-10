import {motion} from 'framer-motion';
import {ReactNode} from 'react';
import useSound from 'use-sound';
import useSoundEnabled from '../SoundToggler/sound-enabled';
import styles from './IconButton.module.css';

export type IconButtonProps = {
  icon: JSX.Element;
  children?: ReactNode;
  className?: string;
  clickHandler?: Function;
  highlightDeps?: any[];
  [x: string]: any;
};

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
      transition={{duration: 0.25, bounce: 0.4}}
      {...delegated}
    >
      {icon}
      {children}
    </motion.button>
  );
};

export default IconButton;
