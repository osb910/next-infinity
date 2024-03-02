'use client';

import {motion, type MotionProps} from 'framer-motion';
import {useFormStatus} from 'react-dom';
import Spinner from '@/ui/Spinner';
import {type ComponentPropsWithoutRef, type ReactNode} from 'react';
import cls from './Form.module.css';
import clsx from 'clsx';

export type SubmitProps = ComponentPropsWithoutRef<'button'> &
  Partial<MotionProps> & {
    children: ReactNode;
    isSubmitting?: boolean;
  };

export const Submit = ({children, isSubmitting, ...rest}: SubmitProps) => {
  const {pending} = useFormStatus();

  return (
    <motion.button
      layout={true}
      transition={{
        type: 'spring',
        stiffness: 280,
        damping: 25,
        restDelta: 0.01,
      }}
      {...rest}
      className={clsx(cls.submit, rest.className)}
      type='submit'
      disabled={pending || rest.disabled}
    >
      <span>
        {children}
        {(pending || isSubmitting) && <Spinner size={22} />}
      </span>
    </motion.button>
  );
};
