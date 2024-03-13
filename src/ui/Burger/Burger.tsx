import {MotionProps, motion} from 'framer-motion';
import {ComponentPropsWithoutRef} from 'react';
import cls from './Burger.module.css';
import clsx from 'clsx';

export type BurgerProps = Partial<MotionProps> &
  ComponentPropsWithoutRef<'button'> & {
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
  const style = {'--color': color ?? 'var(--gray-500)', '--size': size};

  return (
    <motion.button
      whileHover={{scale: 1.1, rotate: isOpen ? '90deg' : '0'}}
      whileFocus={{scale: 1.1, rotate: isOpen ? '90deg' : '0'}}
      whileTap={{scale: 0.95}}
      {...rest}
      type='button'
      className={clsx(cls.burger, rest.className)}
      style={{...style, ...rest.style}}
      transition={{...transition, ...rest.transition}}
      aria-label='Open menu'
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
