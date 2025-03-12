'use client';

import {useEffect, useState, useCallback} from 'react';
import {AlertOctagon, AlertTriangle, CheckCircle, Info, X} from 'react-feather';
import {motion} from 'framer-motion';
import clsx from 'clsx';
import VisuallyHidden from '@/ui/VisuallyHidden';
import {TIME} from '@/utils/constants';
import type {ToastProps} from './types';
import cls from './Toast.module.css';

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

const Toast = ({
  // id,
  variant,
  dismiss,
  delay = 60000,
  children,
  ...rest
}: ToastProps) => {
  const Icon = ICONS_BY_VARIANT[variant];
  const [exiting, setExiting] = useState<boolean>(false);

  const smoothlyDismiss = useCallback(() => {
    setExiting(true);
    const timer = setTimeout(() => {
      setExiting(false);
      dismiss();
    }, TIME.goldenSec / 4);
    return () => clearTimeout(timer);
  }, [dismiss]);

  useEffect(() => {
    if (delay === 'infinite') return;
    const timeout = setTimeout(() => {
      smoothlyDismiss();
    }, delay);
    return () => clearTimeout(timeout);
  }, [delay, smoothlyDismiss]);

  const enterKeyframes = ['110%', '0%'];
  const exitKeyframes = ['0%', '110%'];

  return (
    <motion.li
      onClick={smoothlyDismiss}
      className={clsx(variant, cls.toast, cls[variant])}
      animate={{
        insetInlineStart: exiting ? exitKeyframes : enterKeyframes,
      }}
      {...rest}
    >
      <section className={`iconContainer ${cls.iconContainer}`}>
        <Icon size={24} />
      </section>
      <section className={`content ${cls.content}`}>
        <VisuallyHidden>{variant} -</VisuallyHidden>
        {children}
      </section>
      <button
        className={`closeButton ${cls.closeButton}`}
        onClick={smoothlyDismiss}
        aria-label='Dismiss message'
        aria-live='off'
      >
        <X size={24} />
      </button>
    </motion.li>
  );
};

export default Toast;
