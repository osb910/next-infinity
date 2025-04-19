'use client';

import {type ReactNode, type ComponentPropsWithoutRef} from 'react';
import {motion, type MotionProps} from 'framer-motion';
import useScroll from '@/hooks/useScroll';
import useWindowSize from '@/hooks/useWindowSize';
import {useNav} from '@/ui/Nav';

export type StickyHeaderProps = ComponentPropsWithoutRef<'header'> &
  Partial<MotionProps> & {
    children: ReactNode;
    minWindowWidth?: number;
  };

const StickyHeader = ({
  children,
  minWindowWidth,
  ...rest
}: StickyHeaderProps) => {
  const {scrollDir} = useScroll();
  const {width} = useWindowSize();
  const {isOpen} = useNav();

  const needsHiding = width >= (minWindowWidth ?? 50) && scrollDir === 'down';

  return (
    <motion.header
      animate={{
        translateY: needsHiding ? '-100%' : '0%',
        backdropFilter: isOpen ? 'unset ' : 'blur(4px)',
      }}
      {...rest}
      // transition={{
      //   type: 'spring',
      //   damping: 10,
      //   stiffness: 60,
      //   ...rest.transition,
      // }}
    >
      {children}
    </motion.header>
  );
};

export default StickyHeader;
