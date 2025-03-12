import {type HTMLMotionProps, motion} from 'framer-motion';
import {ComponentPropsWithoutRef} from 'react';
import cls from './Burger.module.css';
import clsx from 'clsx';
import type {CSSProps} from '@/types';

export type BurgerProps = ComponentPropsWithoutRef<'button'> &
  HTMLMotionProps<'button'> & {
    isOpen: boolean;
    color?: string;
    size?: string;
  };

const Burger = ({isOpen, color, size, ...rest}: BurgerProps) => {
  const transition = {
    type: 'spring',
    damping: 12,
    stiffness: 120,
    restDelta: 0.01,
  };
  const style: CSSProps = {
    '--color': color ?? 'var(--gray-500)',
    '--size': size ?? '1.5rem',
  };

  return (
    <motion.button
      whileHover={{scale: 1.1, rotate: isOpen ? '90deg' : '0'}}
      whileFocus={{scale: 1.1, rotate: isOpen ? '90deg' : '0'}}
      whileTap={{scale: 0.95}}
      aria-label='Open menu'
      {...rest}
      // @ts-expect-error unknown prop
      type='button'
      className={clsx(cls.burger, rest.className)}
      style={{...style, ...rest.style}}
      transition={{...transition, ...rest.transition}}
      aria-expanded={isOpen}
    >
      <motion.span
        animate={
          isOpen
            ? {rotate: '45deg', translateY: 'calc(var(--size) / 3)'}
            : {rotate: '0', translateY: 'calc(var(--size) * 0)'}
        }
        transition={transition}
      />
      <motion.span
        animate={
          isOpen
            ? {
                rotate: '180deg',
                inlineSize: 'calc(var(--size) - 100%)',
              }
            : {
                rotate: '0deg',
                inlineSize: 'calc(var(--size) - 20%)',
              }
        }
        transition={transition}
      />
      <motion.span
        animate={
          isOpen
            ? {rotate: '-45deg', translateY: 'calc(var(--size) / -3)'}
            : {rotate: '0', translateY: 'calc(var(--size) * 0)'}
        }
        transition={transition}
      />
    </motion.button>
  );
};

export default Burger;
