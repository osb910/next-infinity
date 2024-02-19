import {type ComponentProps, type ReactNode} from 'react';
import {Code, type BrightProps} from 'bright';
import clsx from 'clsx';
import theme from './theme';
import cls from './Codum.module.css';

export type CodeProps = Pick<BrightProps, 'code'> &
  Partial<Omit<BrightProps, 'code'>> &
  ComponentProps<'pre'>;

const CodeSnippet = ({...delegated}: CodeProps) => {
  return (
    <Code
      {...delegated}
      code={delegated.code.trim()}
      theme={theme}
      className={clsx(cls.wrapper, delegated.className)}
    />
  );
};

export default CodeSnippet;
