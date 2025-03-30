'use client';

import {
  createContext,
  useMemo,
  useEffect,
  useContext,
  useCallback,
  useState,
  type ReactNode,
} from 'react';
import useHotKeys, {HotKey} from '../../hooks/useHotkeys';
import type {Toast, ToastContextProps} from './types';

const ToastContext = createContext<ToastContextProps>({
  toasts: [],
  createToast: () => {},
  dismissToast: () => {},
  clearToasts: () => {},
});

export const ToastProvider = ({children}: {children: ReactNode}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const resetBtn = document.querySelector(
      '.toaster .btn:not(.closeButton)'
    ) as HTMLButtonElement;
    resetBtn?.focus();
  }, [toasts]);

  const createToast = useCallback(
    (
      variant: Toast['variant'],
      message: Toast['message'],
      delay?: Toast['delay']
    ) => {
      setToasts((current) => [
        {id: crypto.randomUUID(), variant, message, delay},
        ...current,
      ]);
      const btn = document.querySelector('.toaster .btn') as
        | HTMLButtonElement
        | HTMLAnchorElement;
      btn?.focus();
    },
    []
  );

  const dismissToast = (id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  };

  const clearToasts = useCallback(() => setToasts([]), []);

  const keyboardShortcuts = useMemo((): HotKey[] => {
    return [
      {
        hotKey: 'Escape',
        run: () => clearToasts(),
      },
    ];
  }, [clearToasts]);
  useHotKeys(keyboardShortcuts);

  return (
    <ToastContext.Provider
      value={{toasts, createToast, dismissToast, clearToasts}}
    >
      {children}
    </ToastContext.Provider>
  );
};

export const useToaster = () => {
  const data = useContext(ToastContext);

  if (!data)
    throw new Error('Cannot consume Toast context without a ToastProvider');

  return data;
};
