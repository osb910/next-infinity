'use client';

import {useId, ChangeEvent, ReactNode, ComponentProps} from 'react';

export interface InputProps extends ComponentProps<'input'> {
  label: string;
  className?: string;
  setInput?: Function;
  children?: ReactNode;
}

const Input = ({
  label,
  className,
  setInput,
  children,
  ...delegated
}: InputProps) => {
  const generatedId = useId();
  const appliedId = `${label.toLowerCase()}${generatedId}`;

  return (
    <p className={className ?? ''} style={{position: 'relative'}}>
      <label htmlFor={appliedId}>{label}</label>
      <input
        type='text'
        onChange={(evt: ChangeEvent): void =>
          setInput?.(+(evt.target as HTMLInputElement).value)
        }
        {...delegated}
        id={appliedId}
        dir='auto'
      />
      {children}
    </p>
  );
};

export default Input;
