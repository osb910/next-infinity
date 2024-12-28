'use client';

import {useEffect, useRef, useCallback} from 'react';

type TimeoutCallback = () => void;

const useTimeout = (cb: TimeoutCallback, delay: number) => {
  const cbRef = useRef<TimeoutCallback>(cb);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    cbRef.current = cb;
  }, [cb]);

  const set = useCallback(() => {
    const timeout = setTimeout(() => cbRef.current(), delay);
    if (timeout) timeoutRef.current = timeout;
  }, [delay]);

  const clear = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  useEffect(() => {
    set();
    return clear;
  }, [delay, set, clear]);

  return {reset, clear};
};

export default useTimeout;
