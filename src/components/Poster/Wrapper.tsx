'use client';

import {motion} from 'framer-motion';
import {ReactNode} from 'react';

interface WrapperProps {
  children: ReactNode;
  [key: string]: any;
}

const Wrapper = ({children, ...delegated}: WrapperProps) => {
  return (
    <motion.li
      whileHover={{
        scale: 1.06,
        color: [
          'rgb(var(--color-primary-rgb))',
          'rgb(var(--color-accent-rgb))',
        ],
        backgroundColor: ['rgba(20, 20, 20, 0.65)', 'rgba(20, 20, 20, 0.35)'],
        boxShadow: ['0', '0px 0px 16px 0px rgba(20, 20, 20, 0.4)'],
        textShadow: ['0', '0px 1px 6px rgba(30, 30, 80, 0.5)'],
      }}
      animate={{}}
      transition={{
        type: 'spring',
      }}
      {...delegated}
    >
      {children}
    </motion.li>
  );
};

export default Wrapper;
