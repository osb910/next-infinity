'use client';

import {useEffect, useRef} from 'react';
import useRenderCount from './useRenderCount';

export type PropChanges<T> = {
  [K in keyof T]?: {
    previous: T[K];
    current: T[K];
  };
};

export type DebugInfo<T> = {
  count: number;
  changedProps: PropChanges<T>;
  timeSinceLastRender: number;
  lastRenderTimestamp: number;
};

/**
 * A hook for debugging component renders and prop changes
 * @param componentName - Name of the component being debugged
 * @param props - Component props to track
 * @returns Debug information including render count, changed props, and timing
 */
const useDebugInfo = <T extends object>(
  componentName: string,
  props: T
): DebugInfo<T> => {
  const count = useRenderCount();
  const changedProps = useRef<PropChanges<T>>({});
  const previousProps = useRef<T>(props);
  const lastRenderTimestamp = useRef<number>(Date.now());

  const propKeys = Object.keys({...props, ...previousProps.current}) as Array<
    keyof T
  >;

  changedProps.current = propKeys.reduce((obj, key) => {
    if (props[key] === previousProps.current[key]) return obj;

    return {
      ...obj,
      [key]: {
        previous: previousProps.current[key],
        current: props[key],
      },
    };
  }, {} as PropChanges<T>);

  const info: DebugInfo<T> = {
    count,
    changedProps: changedProps.current,
    timeSinceLastRender: Date.now() - lastRenderTimestamp.current,
    lastRenderTimestamp: lastRenderTimestamp.current,
  };

  useEffect(() => {
    previousProps.current = props;
    lastRenderTimestamp.current = Date.now();
    console.log('[debug-info]', componentName, info);
  });

  return info;
};

export default useDebugInfo;
