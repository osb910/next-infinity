'use client';

import {motion, type HTMLMotionProps} from 'framer-motion';
import {useFormStatus} from 'react-dom';
import Spinner from '@/ui/Spinner';
import {type ComponentPropsWithoutRef, type ReactNode} from 'react';
import cls from './Form.module.css';
import clsx from 'clsx';

export type SubmitProps = ComponentPropsWithoutRef<'button'> &
  HTMLMotionProps<'button'> & {
    children: ReactNode;
    isSubmitting?: boolean;
  };

export const Submit = ({children, isSubmitting, ...rest}: SubmitProps) => {
  const {pending} = useFormStatus();

  // Extract className from rest to use it with clsx
  const {className, ...otherProps} = rest;

  return (
    <motion.button
      layout={true}
      transition={{
        type: 'spring',
        stiffness: 280,
        damping: 25,
        restDelta: 0.01,
      }}
      disabled={pending || isSubmitting}
      {...otherProps}
      className={clsx(cls.submit, className)}
      type='submit'
    >
      <span>
        {children}
        {(pending || isSubmitting) && <Spinner size={22} />}
      </span>
    </motion.button>
  );
};
