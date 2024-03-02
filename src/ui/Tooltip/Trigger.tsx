'use client';

import * as T from '@radix-ui/react-tooltip';
import clsx from 'clsx';
import {type ReactNode, type ComponentProps} from 'react';
import cls from './Tooltip.module.css';

export interface TriggerProps extends ComponentProps<'button'> {
  children: ReactNode;
}

export const Trigger = ({children, ...rest}: TriggerProps) => {
  return (
    <T.Trigger asChild>
      <button
        type='button'
        {...rest}
        className={clsx(cls.trigger, rest.className)}
      >
        {children}
      </button>
    </T.Trigger>
  );
};
