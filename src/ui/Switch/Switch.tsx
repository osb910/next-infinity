'use client';

import {Root, Thumb, type PrimitiveButtonProps} from '@radix-ui/react-switch';
import {motion} from 'framer-motion';
import useSound from 'use-sound';
import useToggle from '@/hooks/useToggle';
import useSoundEnabled from '@/ui/SfxSwitch/sound-enabled';
import cls from './Switch.module.css';

export interface SwitchProps extends PrimitiveButtonProps {
  width?: string;
  switchColor?: string;
  switchOnColor?: string;
  thumbColor?: string;
  noSfx?: boolean;
}

export const Switch = ({
  width = '2.5rem',
  switchColor = 'hsla(0, 0%, 50%, 0.8)',
  switchOnColor = 'hsla(210, 8%, 25%, 0.9)',
  thumbColor = 'hsl(0, 0%, 85%)',
  noSfx = false,
  ...delegated
}: SwitchProps) => {
  const [isOn, toggleSwitch] = useToggle(false);

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
        className={`${cls.SwitchRoot} ${delegated.className ?? ''}`}
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
            className={cls.SwitchThumb}
            layout={true}
            transition={SPRING}
          />
        </Thumb>
      </motion.button>
    </Root>
  );
};

export default Switch;
