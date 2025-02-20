'use client';

import {useEffect} from 'react';
import useTimeout from './useTimeout';

const useDebounce = (cb: () => void, delay: number, deps: Array<unknown>) => {
  const {reset, clear} = useTimeout(cb, delay);

  useEffect(reset, [...deps, reset]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(clear, []);
};

export default useDebounce;
