'use client';

import {motion, type MotionProps} from 'framer-motion';
import {ComponentPropsWithoutRef, ReactNode} from 'react';

export type WrapperProps = ComponentPropsWithoutRef<'figure'> &
  Partial<MotionProps> & {
    children: ReactNode;
  };

const Wrapper = ({children, ...rest}: WrapperProps) => {
  return (
    <motion.figure
      whileHover={{
        scale: 1.06,
        color: [
          'rgb(var(--color-primary-rgb))',
          'rgb(var(--color-accent-rgb))',
        ],
        backgroundColor: ['rgba(20, 20, 20, 0.65)', 'rgba(20, 20, 20, 0.35)'],
        boxShadow: ['0', '0px 0px 16px 0px rgba(20, 20, 20, 0.4)'],
      }}
      animate={{}}
      transition={{
        type: 'spring',
        damping: 12,
        stiffness: 150,
      }}
      {...rest}
    >
      {children}
    </motion.figure>
  );
};

export default Wrapper;
