'use client';

import * as RSeparator from '@radix-ui/react-separator';
import './Separator.css';
import {type ComponentPropsWithoutRef} from 'react';
import {type CSSProps} from '@/types';
import clsx from 'clsx';

interface SeparatorProps extends ComponentPropsWithoutRef<'div'> {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
  size?: string;
  color?: string;
  space?: string;
}

const Separator = ({
  orientation = 'vertical',
  size = '1px',
  color = 'var(--gray-500)',
  space = '0.25em',
  decorative = true,
  ...rest
}: SeparatorProps) => {
  const style: CSSProps = {
    '--space': orientation === 'vertical' ? `0.125em ${space}` : `${space} 0`,
    '--color': color,
    '--size': size,
  };
  return (
    <RSeparator.Root
      className={clsx('SeparatorRoot', rest.className)}
      style={style}
      orientation={orientation}
      decorative={decorative}
    />
  );
};

export default Separator;
