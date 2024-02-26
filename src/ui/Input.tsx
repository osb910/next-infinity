'use client';

import {
  useId,
  type ChangeEvent,
  type ReactNode,
  type ComponentPropsWithRef,
  forwardRef,
} from 'react';

export interface InputProps extends ComponentPropsWithRef<'input'> {
  label?: string;
  setInput?: Function;
  children?: ReactNode;
  ctrlClass?: string;
}

export const Input = forwardRef(function Input(
  {label, setInput, children, ctrlClass, ...delegated}: InputProps,
  ref: any
) {
  const appliedId = `${label?.toLowerCase?.() ?? ''}${useId()}`;

  return (
    <p className={ctrlClass ?? ''} style={{position: 'relative'}}>
      {label && <label htmlFor={appliedId}>{label}</label>}
      <input
        type='text'
        name={label?.toLowerCase()}
        onChange={(evt: ChangeEvent): void =>
          setInput?.(evt.target as HTMLInputElement)
        }
        {...(delegated.type === 'number' && {min: 1, step: 1})}
        ref={ref}
        {...delegated}
        id={appliedId}
        dir='auto'
      />
      {children}
    </p>
  );
});

export default Input;
