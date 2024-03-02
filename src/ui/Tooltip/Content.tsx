'use client';

import * as T from '@radix-ui/react-tooltip';
import {type ReactNode, type ComponentProps} from 'react';
import cls from './Tooltip.module.css';
import clsx from 'clsx';

export interface ContentProps extends ComponentProps<'section'> {
  children: ReactNode;
  offset?: number;
}

export const Content = ({children, offset, ...rest}: ContentProps) => {
  return (
    <T.Content asChild sideOffset={offset}>
      <section {...rest} className={clsx(cls.content, rest.className)}>
        {children}
        <T.Arrow className={cls.arrow} />
      </section>
    </T.Content>
  );
};
