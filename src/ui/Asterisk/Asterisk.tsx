import Tooltip, {
  Trigger,
  Content,
  type TooltipProps,
  type TriggerProps,
} from '@/ui/Tooltip';
import {type ReactNode} from 'react';
import cls from './Asterisk.module.css';

interface AsteriskProps extends TooltipProps, Omit<TriggerProps, 'children'> {
  offset?: number;
  children?: ReactNode;
}

const Asterisk = ({
  delay = 400,
  offset = 4,
  children,
  noHover = false,
  defaultOpen = false,
  ...rest
}: AsteriskProps) => {
  return (
    <Tooltip delay={delay} noHover={noHover} defaultOpen={defaultOpen}>
      <Trigger {...rest} className={cls.trigger}>
        *
      </Trigger>
      <Content className={cls.content} offset={offset}>
        {children}
      </Content>
    </Tooltip>
  );
};

export default Asterisk;
