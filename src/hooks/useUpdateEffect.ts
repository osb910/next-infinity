'use client';

import {useEffect, useRef} from 'react';

const useUpdateEffect = (cb: Function, deps: Array<any>) => {
  const firstRender = useRef<boolean>();

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
