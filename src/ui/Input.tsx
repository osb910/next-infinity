'use client';

import {
  useId,
  type ChangeEvent,
  type ReactNode,
  type ComponentProps,
} from 'react';

export interface InputProps extends ComponentProps<'input'> {
  label: string;
  className?: string;
  setInput?: Function;
  children?: ReactNode;
}

export const Input = ({
  label,
  className,
  setInput,
  children,
  ...delegated
}: InputProps) => {
  const appliedId = `${label.toLowerCase()}${useId()}`;

  return (
    <p className={className ?? ''} style={{position: 'relative'}}>
      <label htmlFor={appliedId}>{label}</label>
      <input
        type='text'
        name={label.toLowerCase()}
        onChange={(evt: ChangeEvent): void =>
          setInput?.(+(evt.target as HTMLInputElement).value)
        }
        {...(delegated.type === 'number' && {min: 1})}
        {...delegated}
        id={appliedId}
        dir='auto'
      />
      {children}
    </p>
  );
};

export default Input;
