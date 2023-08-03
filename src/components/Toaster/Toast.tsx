'use client';

import {useEffect, ReactNode, useState, useCallback} from 'react';
import {AlertOctagon, AlertTriangle, CheckCircle, Info, X} from 'react-feather';
import StyledToast from './StyledToast';
import {motion} from 'framer-motion';
// @ts-ignore';
import styles from './Toast.module.css';

import VisuallyHidden from '../VisuallyHidden';

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

interface ToastProps {
  variant: 'notice' | 'warning' | 'success' | 'error';
  dismiss: () => void;
  delay?: number;
  children: ReactNode;
  dir: 'ltr' | 'rtl';
}

const Toast = ({
  variant,
  dismiss,
  delay = 60000,
  children,
  dir,
}: ToastProps) => {
  const Icon = ICONS_BY_VARIANT[variant];
  const [exiting, setExiting] = useState<boolean>(false);

  const smoothlyDismiss = useCallback(() => {
    setExiting(true);
    const timer = setTimeout(() => {
      setExiting(false);
      dismiss();
    }, 1236);
    return () => clearTimeout(timer);
  }, [dismiss]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      smoothlyDismiss();
    }, delay);
    return () => clearTimeout(timeout);
  }, [delay, smoothlyDismiss]);

  const enterKeyframes = dir === 'ltr' ? ['110%', '0%'] : ['-110%', '0%'];
  const exitKeyframes = dir === 'ltr' ? ['0%', '115%'] : ['0%', '-115%'];

  return (
    <motion.li
      key='toast'
      onClick={smoothlyDismiss}
      className={`${variant} ${styles.toast} ${styles[variant]} ${
        exiting ? 'exiting' : ''
      }`}
      animate={{
        translateX: exiting ? exitKeyframes : enterKeyframes,
      }}
      transition={{duration: 1.2, type: 'spring', bounce: 0.4}}
    >
      <section className={`iconContainer ${styles.iconContainer}`}>
        <Icon size={24} />
      </section>
      <section className={`content ${styles.content}`}>
        <VisuallyHidden>{variant} -</VisuallyHidden>
        {children}
      </section>
      <button
        className={`closeButton ${styles.closeButton}`}
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
