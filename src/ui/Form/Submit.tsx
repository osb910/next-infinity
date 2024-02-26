'use client';

import {motion, type MotionProps} from 'framer-motion';
import {useFormStatus} from 'react-dom';
import Spinner from '@/ui/Spinner';
import {type ComponentPropsWithoutRef, type ReactNode} from 'react';
import cls from './Form.module.css';

type SubmitProps = ComponentPropsWithoutRef<'button'> &
  Partial<MotionProps> & {
    children: ReactNode;
    isSubmitting?: boolean;
  };

const Submit = ({children, isSubmitting, ...delegated}: SubmitProps) => {
  const {pending} = useFormStatus();

  return (
    <motion.button
      className={cls.submit}
      layout={true}
      transition={{
        type: 'spring',
        stiffness: 250,
        damping: 30,
        restDelta: 0.01,
      }}
      {...delegated}
      type='submit'
      disabled={pending || delegated.disabled}
    >
      <motion.span layout='preserve-aspect'>
        {children}
        {(pending || isSubmitting) && <Spinner size={22} />}
      </motion.span>
    </motion.button>
  );
};

export default Submit;
