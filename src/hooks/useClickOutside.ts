'use client';

import {RefObject} from 'react';
import useEventListener from './useEventListener';

export type Handler = (event: MouseEvent) => void;

export interface Options {
  disabled?: boolean;
  capture?: boolean;
}

const useClickOutside = <T extends HTMLElement>(
  ref: RefObject<T>,
  cb: Handler,
  options: Options = {}
) => {
  const {disabled = false, capture = false} = options;
  useEventListener(
    'click',
    (evt: MouseEvent) => {
      if (
        disabled ||
        ref.current === null ||
        ref.current.contains(evt.target as Node)
      )
        return;
      cb(evt);
    },
    document,
    {capture}
  );
};

export default useClickOutside;
