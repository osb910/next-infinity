'use client';

import * as T from '@radix-ui/react-tooltip';
import {type ReactNode} from 'react';

export interface TooltipProps extends T.TooltipProps {
  delay?: number;
  children?: ReactNode;
  noHover?: boolean;
  defaultOpen?: boolean;
}

const Tooltip = ({
  delay = 400,
  noHover = false,
  defaultOpen = false,
  children,
  ...rest
}: TooltipProps) => {
  return (
    <T.Root
      data-tooltip='root'
      delayDuration={delay}
      disableHoverableContent={noHover}
      defaultOpen={defaultOpen}
      {...rest}
    >
      {children}
    </T.Root>
  );
};

export default Tooltip;
