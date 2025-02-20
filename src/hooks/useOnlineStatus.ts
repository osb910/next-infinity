'use client';

import {useState} from 'react';
import useEventListener from './useEventListener';

/**
 * Custom hook to track online/offline status
 * @returns {boolean} Current online status
 */
const useOnlineStatus = (): boolean => {
  const [online, setOnline] = useState<boolean>(() =>
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEventListener('online', () => setOnline(navigator.onLine));
  useEventListener('offline', () => setOnline(navigator.onLine));

  return online;
};

export default useOnlineStatus;
