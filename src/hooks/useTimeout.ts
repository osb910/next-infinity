'use client';

import {useEffect, useRef, useCallback} from 'react';

const useTimeout = (cb: Function, delay: number) => {
  const cbRef = useRef<Function>(cb);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    cbRef.current = cb;
  }, [cb]);

  const set = useCallback(() => {
    const timeout = setTimeout(() => cbRef.current(), delay);
    timeout && (timeoutRef.current = timeout);
  }, [delay]);

  const clear = useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
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
