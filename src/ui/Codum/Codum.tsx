import {type ComponentPropsWithoutRef} from 'react';
import {Code, type BrightProps} from 'bright';
import clsx from 'clsx';
import theme from './theme';
import cls from './Codum.module.css';

export type CodeProps = Pick<BrightProps, 'code'> &
  Partial<Omit<BrightProps, 'code'>> &
  ComponentPropsWithoutRef<'pre'>;

const Codum = ({...rest}: CodeProps) => {
  return (
    <Code
      {...rest}
      code={rest.code.trim()}
      theme={theme}
      className={clsx(cls.wrapper, rest.className)}
    />
  );
};

export default Codum;
