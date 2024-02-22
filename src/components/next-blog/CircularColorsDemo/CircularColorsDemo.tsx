'use client';

import {Play, Pause, RotateCcw} from 'react-feather';
import {motion} from 'framer-motion';
import clsx from 'clsx';

import useToggle from '@/hooks/useToggle';
import useStopwatch from '@/hooks/useStopwatch';

import Card from '@/ui/Card';
import VisuallyHidden from '@/ui/VisuallyHidden';
import cls from './CircularColorsDemo.module.css';

const COLORS = [
  {label: 'red', value: 'hsl(348, 100%, 60%)'},
  {label: 'yellow', value: 'hsl(50, 100%, 55%)'},
  {label: 'blue', value: 'hsl(235, 100%, 65%)'},
];

const CircularColorsDemo = () => {
  const [isRunning, toggleIsRunning] = useToggle(false);
  const {watch, reset} = useStopwatch(isRunning);

  const selectedColor = COLORS[watch.sec % COLORS.length];

  return (
    <Card as='section' className={cls.wrapper}>
      <ul className={cls.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected = color.value === selectedColor.value;

          return (
            <li className={cls.color} key={index}>
              {isSelected && (
                <motion.div
                  className={cls.selectedColorOutline}
                  initial={{
                    borderRadius: 12,
                  }}
                  layoutId={`${color}`}
                  transition={{
                    type: 'string',
                    damping: 25,
                    stiffness: 250,
                  }}
                />
              )}
              <motion.div
                className={clsx(
                  cls.colorBox,
                  isSelected && cls.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>{color.label}</VisuallyHidden>
              </motion.div>
            </li>
          );
        })}
      </ul>

      <div className={cls.timeWrapper}>
        <dl className={cls.timeDisplay}>
          <dt>Time Elapsed</dt>
          <motion.dd
            animate={{opacity: [0, 1]}}
            key={`${watch.timeElapsed}`}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 100,
            }}
          >
            {watch.timeElapsed}
          </motion.dd>
        </dl>
        <div className={cls.actions}>
          <button onClick={() => toggleIsRunning()}>
            {isRunning ? <Pause /> : <Play />}
            <VisuallyHidden>{isRunning ? 'Pause' : 'Play'}</VisuallyHidden>
          </button>
          <button
            onClick={() => {
              toggleIsRunning(false);
              reset();
            }}
          >
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
};

export default CircularColorsDemo;
