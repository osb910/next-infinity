'use client';

import * as T from '@radix-ui/react-tooltip';
import {type ReactNode, type ComponentPropsWithoutRef} from 'react';
import clsx from 'clsx';
import {MotionProps, motion} from 'framer-motion';
import './Tooltip.css';

export type ContentProps = ComponentPropsWithoutRef<'section'> &
  MotionProps & {
    children: ReactNode;
    offset?: number;
  };

export const Content = ({children, offset, ...rest}: ContentProps) => {
  return (
    <T.Content asChild sideOffset={offset}>
      <motion.section
        {...rest}
        data-tooltip='content'
        animate={{translateY: [4, 0], opacity: [0, 1]}}
        transition={{
          type: 'spring',
          damping: 15,
          stiffness: 240,
        }}
        className={clsx('tooltip-content', rest.className)}
      >
        {children}
        <T.Arrow className={'tooltip-arrow'} />
      </motion.section>
    </T.Content>
  );
};
