'use client';

import {type EffectCallback, useEffect} from 'react';

/**
 * Hook that runs an effect only once when a component mounts.
 * @param effect Callback function that runs once on mount
 */
const useEffectOnce = (effect: EffectCallback): void => {
  // Intentionally only runs on mount with empty dependency array
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, []);
};

export default useEffectOnce;
