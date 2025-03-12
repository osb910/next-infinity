'use client';

import {useState} from 'react';
import {Eye, EyeOff} from 'react-feather';
import cls from './PasswordInput.module.css';
import {stringifyRegex} from '@/lib/text/regex';
import Input, {type InputComponent} from '../Input';

export type PasswordInputProps = InputComponent & {
  minLength?: number;
  maxLength?: number;
  requireSymbols?: boolean;
  requireDigits?: boolean;
};

export const PasswordInput = ({
  minLength = 8,
  maxLength = 32,
  requireSymbols = true,
  requireDigits = true,
  ...rest
}: PasswordInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const passwordRegex = new RegExp(
    `^(?=.*[A-Z])(?=.*[a-z])${requireDigits ? `(?=.*\\d)` : ''}(?=.*[\\p{L}${
      requireDigits ? `\\p{N}` : ''
    }_])${
      requireSymbols ? `(?=.*[?^+*!@"$%&(){}|[\\]\\/\\\\])` : ''
    }.{${minLength},${maxLength}}$`,
    'u'
  );

  return (
    <Input
      name='password'
      pattern={stringifyRegex(passwordRegex)}
      title={`Must have at least an uppercase letter, a lowercase letter, ${
        requireDigits ? `a digit, ` : ''
      }${
        requireSymbols ? `a special character, ` : ''
      }and be between ${minLength} and ${maxLength} characters.`}
      onPaste={(evt) => evt.preventDefault()}
      {...rest}
      as='input'
      type={isPasswordVisible ? 'text' : 'password'}
    >
      <span
        tabIndex={0}
        className={cls.eye}
        onClick={() => setIsPasswordVisible((is) => !is)}
      >
        {isPasswordVisible ? <EyeOff /> : <Eye />}
      </span>
    </Input>
  );

  // return (
  //   <p className={`${className ?? ''} ${cls.control}`}>
  //     <label htmlFor={appliedId}>{label}</label>
  //     <span className={`${cls.inputContainer}`}>
  //       <input
  //         onChange={(evt: ChangeEvent): void =>
  //           setInput?.((evt.target as HTMLInputElement).value)
  //         }
  //         className={cls.input}
  //         pattern={stringifyRegex(passwordRegex)}
  //         title={`Must have at least an uppercase letter, a lowercase letter, ${
  //           requireDigits ? `a digit, ` : ''
  //         }${
  //           requireSymbols ? `a special character, ` : ''
  //         }and be between ${minLength} and ${maxLength} characters.`}
  //         onPaste={evt => evt.preventDefault()}
  //         {...delegated}
  //         type={isPasswordVisible ? 'text' : 'password'}
  //         id={appliedId}
  //         dir='auto'
  //       />
  //       <span
  //         tabIndex={0}
  //         className={cls.eye}
  //         onClick={() => setPasswordVisible(is => !is)}
  //       >
  //         {isPasswordVisible ? <EyeOff /> : <Eye />}
  //       </span>
  //     </span>
  //     {children}
  //   </p>
  // );
};

export default PasswordInput;
