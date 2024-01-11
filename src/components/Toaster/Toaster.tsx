'use client';

import Portal from '@/ui/Portal';
import Toast from './Toast';
import useToaster from './use-toaster';
import StyledToaster from './StyledToaster';
// @ts-ignore
import styles from './Toaster.module.css';

const Toaster = ({lang}: {lang?: string}) => {
  const {toasts, dismissToast} = useToaster();
  return (
    <Portal lang={lang ?? 'en'} style='z-index: 4;'>
      <StyledToaster
        className={`toaster`}
        role='region'
        aria-live='polite'
        aria-label='Notification'
      >
        {toasts.map(({id, variant, message, delay}, idx) => (
          <Toast
            dir={lang === 'ar' ? 'rtl' : 'ltr'}
            key={id}
            variant={variant}
            dismiss={() => dismissToast(idx)}
            delay={delay}
          >
            {message}
          </Toast>
        ))}
      </StyledToaster>
    </Portal>
  );
};

export default Toaster;
