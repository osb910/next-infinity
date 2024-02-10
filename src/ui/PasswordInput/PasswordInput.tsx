'use client';

import {useState, useId, ReactNode, ChangeEvent, ComponentProps} from 'react';
import {Eye, EyeOff} from 'react-feather';
import styles from './PasswordInput.module.css';
import {stringifyRegex} from '@/lib/regex';

export interface PasswordInputProps extends ComponentProps<'input'> {
  label: string;
  minLength?: number;
  maxLength?: number;
  requireSymbols?: boolean;
  requireDigits?: boolean;
  className?: string;
  setInput?: Function;
  children?: ReactNode;
  [x: string]: any;
}

export const PasswordInput = ({
  label = 'Password',
  minLength = 8,
  maxLength = 32,
  requireSymbols = true,
  requireDigits = true,
  setInput,
  className,
  children,
  ...delegated
}: PasswordInputProps) => {
  const generatedId = useId();
  const appliedId = `password-${generatedId}`;
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const passwordRegex = new RegExp(
    `^(?=.*[A-Z])(?=.*[a-z])${requireDigits ? `(?=.*\\d)` : ''}(?=.*[\\p{L}${
      requireDigits ? `\\p{N}` : ''
    }_])${
      requireSymbols ? `(?=.*[?^+*!@"$%&(){}|[\\]\\/\\\\])` : ''
    }.{${minLength},${maxLength}}$`,
    'u'
  );

  return (
    <p className={`${className ?? ''} ${styles.control}`}>
      <label htmlFor={appliedId}>{label}</label>
      <span className={`${styles.inputContainer}`}>
        <input
          onChange={(evt: ChangeEvent): void =>
            setInput?.((evt.target as HTMLInputElement).value)
          }
          className={styles.input}
          pattern={stringifyRegex(passwordRegex)}
          title={`Must have at least an uppercase letter, a lowercase letter, ${
            requireDigits ? `a digit, ` : ''
          }${
            requireSymbols ? `a special character, ` : ''
          }and be between ${minLength} and ${maxLength} characters.`}
          onPaste={evt => evt.preventDefault()}
          {...delegated}
          type={showPassword ? 'text' : 'password'}
          id={appliedId}
          dir='auto'
        />
        <span
          tabIndex={0}
          className={styles.eye}
          onClick={() => setShowPassword(is => !is)}
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </span>
      </span>
      {children}
    </p>
  );
};

export default PasswordInput;
