'use client';

import {LayoutGroup} from 'framer-motion';
import clsx from 'clsx';
import {useToaster} from './useToaster';
import Toast from './Toast';
import Portal from '@/ui/Portal';
import cls from './Toaster.module.css';

const Toaster = ({lang}: {lang?: string}) => {
  const {toasts, dismissToast} = useToaster();
  return (
    <Portal lang={lang ?? 'en'} style='z-index: 4;'>
      <LayoutGroup>
        <ol
          className={clsx('toaster', cls.toaster)}
          role='region'
          aria-live='polite'
          aria-label='Notification'
        >
          {toasts.map(({id, variant, message, delay}, idx) => (
            <Toast
              key={id}
              id={id}
              variant={variant}
              dismiss={() => dismissToast(id)}
              delay={delay}
              layoutId={id}
              transition={{
                type: 'spring',
                damping: 12 + idx * 2,
                stiffness: 100 + idx * 25,
                restDelta: 0.01,
              }}
            >
              {message}
            </Toast>
          ))}
        </ol>
      </LayoutGroup>
    </Portal>
  );
};

export default Toaster;
