'use client';

import * as T from '@radix-ui/react-tooltip';
import clsx from 'clsx';
import {type ReactNode, type ComponentProps} from 'react';
import './Tooltip.css';

export interface TriggerProps extends ComponentProps<'button'> {
  children: ReactNode;
}

export const Trigger = ({children, ...rest}: TriggerProps) => {
  return (
    <T.Trigger asChild>
      <button
        data-tooltip='trigger'
        type='button'
        {...rest}
        className={clsx('tooltip-trigger', rest.className)}
      >
        {children}
      </button>
    </T.Trigger>
  );
};
