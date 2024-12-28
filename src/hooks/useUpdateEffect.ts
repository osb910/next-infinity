'use client';

import {useEffect, useRef} from 'react';
import type {ImpureFn} from '@/types';

const useUpdateEffect = (cb: ImpureFn, deps: Array<unknown>) => {
  const firstRender = useRef<boolean>(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    return cb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, cb]);
};

export default useUpdateEffect;
