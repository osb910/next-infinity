'use client';

import {useEffect, useState} from 'react';
import clsx from 'clsx';
import {Play, Pause, RotateCcw} from 'react-feather';
import {motion} from 'framer-motion';

import Card from '@/ui/Card';
import VisuallyHidden from '@/ui/VisuallyHidden';

import cls from './CircularColorsDemo.module.css';

const COLORS = [
  {label: 'red', value: 'hsl(348, 100%, 60%)'},
  {label: 'yellow', value: 'hsl(50, 100%, 55%)'},
  {label: 'blue', value: 'hsl(235, 100%, 65%)'},
];

const CircularColorsDemo = () => {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(
      () => setTimeElapsed(current => current + 1),
      1000
    );
    return () => clearInterval(interval);
  }, [isPlaying]);

  const selectedColor = COLORS[timeElapsed % 3];

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
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={cls.actions}>
          <button onClick={() => setIsPlaying(current => !current)}>
            {isPlaying ? <Pause /> : <Play />}
            <VisuallyHidden>{isPlaying ? 'Pause' : 'Play'}</VisuallyHidden>
          </button>
          <button
            onClick={() => {
              setIsPlaying(false);
              setTimeElapsed(0);
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
