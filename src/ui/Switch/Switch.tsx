'use client';

import {useState} from 'react';
import {Root, Thumb, type PrimitiveButtonProps} from '@radix-ui/react-switch';
import {motion} from 'framer-motion';
import useSound from 'use-sound';
import useSoundEnabled from '@/ui/SfxSwitch/sound-enabled';
import css from './Switch.module.css';

interface SwitchProps extends PrimitiveButtonProps {
  width?: string;
  switchColor?: string;
  switchOnColor?: string;
  thumbColor?: string;
  noSfx?: boolean;
}

const Switch = ({
  width = '2.5rem',
  switchColor = 'hsla(0, 0%, 50%, 0.8)',
  switchOnColor = 'hsla(210, 8%, 25%, 0.9)',
  thumbColor = 'hsl(0, 0%, 85%)',
  noSfx = false,
  ...delegated
}: SwitchProps) => {
  const [isOn, setIsOn] = useState(false);
  const toggleSwitch = () => setIsOn(current => !current);

  const {soundEnabled} = useSoundEnabled();
  const sfxOn = !noSfx && soundEnabled;
  const [playToggle] = useSound('/sfx/tink.wav', {
    soundEnabled: sfxOn,
    volume: 0.25,
  });

  const style: Record<string, string> = {
    '--width': width,
    '--switch-color': switchColor,
    '--switch-on-color': switchOnColor,
    '--thumb-color': thumbColor,
  };

  const SPRING = {
    type: 'spring',
    stiffness: 250,
    damping: 20,
  };

  return (
    <Root
      {...delegated}
      asChild
      onCheckedChange={checked => {
        playToggle();
        toggleSwitch();
      }}
    >
      <motion.button
        className={`${css.SwitchRoot} ${delegated.className ?? ''}`}
        style={{...style, ...delegated.style}}
        animate={{
          backgroundColor: isOn ? switchOnColor : switchColor,
          boxShadow: isOn
            ? `0 0 0 2px ${switchOnColor}`
            : `0 0 0 2px transparent`,
        }}
        layout={true}
        transition={SPRING}
      >
        <Thumb asChild>
          <motion.span
            className={css.SwitchThumb}
            layout={true}
            transition={SPRING}
          />
        </Thumb>
      </motion.button>
    </Root>
  );
};

export default Switch;
