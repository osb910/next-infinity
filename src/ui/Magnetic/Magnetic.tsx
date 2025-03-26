'use client';

import {
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
  type MouseEvent,
} from 'react';
import {motion, type HTMLMotionProps} from 'framer-motion';
import clsx from 'clsx';
import cls from './Magnetic.module.css';

export type MagneticProps = ComponentPropsWithoutRef<'div'> &
  HTMLMotionProps<'div'> & {
    children: ReactNode;
  };

const Magnetic = ({children, ...rest}: MagneticProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({x: 0, y: 0});
  const {x, y} = position;

  const SPRING = {
    type: 'spring',
    damping: 15,
    stiffness: 150,
    mass: 0.1,
  };

  const moveMouse = (evt: MouseEvent) => {
    const {clientX, clientY} = evt;
    if (!ref.current) return;
    const {left, top, width, height} = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({x, y});
  };
  const reset = () => setPosition({x: 0, y: 0});

  return (
    <motion.div
      {...rest}
      ref={ref}
      className={clsx(cls.magnetic, rest.className)}
      animate={{x, y}}
      transition={{...SPRING, ...rest.transition}}
      onMouseMove={moveMouse}
      onMouseLeave={reset}
    >
      {children}
    </motion.div>
  );
};

export default Magnetic;
