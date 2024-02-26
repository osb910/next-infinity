import {type ReactNode, type ComponentPropsWithoutRef} from 'react';
import {type MotionProps} from 'framer-motion';

export type Toast = {
  id: string;
  variant: 'success' | 'error' | 'warning' | 'notice';
  message: ReactNode;
  delay?: number | 'infinite';
};

export interface ToastContextProps {
  toasts: Array<Toast>;
  createToast: (
    variant: Toast['variant'],
    message: Toast['message'],
    delay?: Toast['delay']
  ) => void;
  dismissToast: (id: string) => void;
  clearToasts: () => void;
}

export type ToastProps = ComponentPropsWithoutRef<'li'> &
  Partial<MotionProps> &
  Omit<Toast, 'message'> & {
    children: ReactNode;
    dismiss: () => void;
  };
