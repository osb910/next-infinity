'use client';

import {
  useId,
  forwardRef,
  useEffect,
  useState,
  useRef,
  type ReactNode,
  type ComponentPropsWithRef,
  type ChangeEventHandler,
  type FocusEventHandler,
} from 'react';
import {motion, type HTMLMotionProps} from 'framer-motion';
import clsx from 'clsx';

import Asterisk from '@/ui/Asterisk';
import {delay} from '@/utils/promises';
import {removeGrammarlyTab} from './util';
import cls from './Input.module.css';
import MotionBackdrop from '../MotionBackdrop';

export type SetInput = (
  target: EventTarget & (HTMLInputElement | HTMLTextAreaElement)
) => void;

type BaseProps = {
  label?: string;
  setInput?: SetInput;
  children?: ReactNode;
  ctrlClass?: string;
  layoutId?: string;
  focused?: string;
  backdropStyle?: Record<string, string | number>;
  asteriskText?: string;
  invalidMsg?: string;
  ctrlChildren?: ReactNode;
  removeExternalTabs?: boolean;
};

export type InputComponent = BaseProps &
  ComponentPropsWithRef<'input'> &
  HTMLMotionProps<'input'> & {
    as?: 'input';
  };

export type TextAreaComponent = BaseProps &
  ComponentPropsWithRef<'textarea'> &
  HTMLMotionProps<'textarea'> & {
    as: 'textarea';
    type?: never;
  };

export const isTextAreaProps = (
  props: InputProps | TextAreaComponent
): props is TextAreaComponent => {
  return props.as === 'textarea' || !('type' in props);
};

export const isInputProps = (
  props: InputProps | InputComponent
): props is InputComponent => {
  return props.as === 'input' || 'type' in props || props.as !== 'textarea';
};

export type InputProps = InputComponent | TextAreaComponent;

export type InputElement = HTMLInputElement | HTMLTextAreaElement;

const Input = forwardRef<InputElement, InputProps>(function Input(props, ref) {
  const {
    as: Tag = 'input',
    label,
    setInput,
    invalidMsg,
    children,
    ctrlChildren,
    ctrlClass,
    layoutId,
    focused,
    asteriskText = 'This field is required',
    backdropStyle,
    removeExternalTabs = true,
    ...delegated
  } = props;
  const rest = delegated as ComponentPropsWithRef<
    InputProps extends InputComponent
      ? HTMLInputElement
      : typeof Tag extends 'textarea'
        ? HTMLTextAreaElement
        : any
  >;
  const appliedId = `${
    rest?.name ?? rest?.id ?? label?.replace?.(/\s/g, '-') ?? ''
  }${useId()}`;
  const [isTouched, setIsTouched] = useState(false);
  const [isAttempted, setIsAttempted] = useState(false);
  const inputRef =
    useRef<
      typeof Tag extends 'textarea' ? HTMLTextAreaElement : HTMLInputElement
    >(null);
  const validityState = inputRef.current?.validity;
  const isInValid =
    isAttempted && !validityState?.valueMissing && !validityState?.valid;

  useEffect(() => {
    if (Tag !== 'textarea' || !isTouched || !removeExternalTabs) return;
    let attempts = 0;
    const remove3rdPartyTabs = async () => {
      if (attempts > 100) return; // Safety net in case of infinite loop
      const removed = removeGrammarlyTab();
      attempts++;
      if (!removed) {
        await delay(200);
        remove3rdPartyTabs(); // Recursion
      }
    };
    remove3rdPartyTabs();
  }, [Tag, isTouched, removeExternalTabs]);

  const changeInput: ChangeEventHandler = (evt) => {
    setInput?.(evt.target as InputElement);
    rest.onChange?.(evt);
  };

  const focusInput: FocusEventHandler = (evt) => {
    setIsTouched(true);
    rest.onFocus?.(evt);
  };

  const blurInput: FocusEventHandler = (evt) => {
    setIsAttempted(true);
    rest.onBlur?.(evt);
  };

  const Element = motion[Tag];

  return (
    <div className={clsx(cls.ctrl, ctrlClass)}>
      {label && (
        <label
          htmlFor={appliedId}
          tabIndex={-1}
          className={cls.label}
        >
          {label}
          {rest.required && <Asterisk tabIndex={-1}>{asteriskText}</Asterisk>}
        </label>
      )}
      <motion.section>
        <div className={clsx(cls.input, isInValid && cls.invalid)}>
          <Element
            {...(isTextAreaProps(props)
              ? {rows: 4}
              : rest.type === 'number'
                ? {min: 1, step: 1}
                : {type: 'text'})}
            ref={ref ?? inputRef}
            {...rest}
            onChange={changeInput}
            onFocus={focusInput}
            onBlur={blurInput}
            id={appliedId}
            dir='auto'
            style={{
              ...rest.style,
              zIndex: focused === rest.name ? 1 : 2,
              borderRadius: backdropStyle?.borderRadius ?? 'inherit',
            }}
          />
          {layoutId && focused === rest.name && (
            <MotionBackdrop
              layoutId={layoutId}
              initial={
                invalidMsg || isInValid
                  ? {
                      ...backdropStyle,
                      boxShadow: '0 0 0 2px hsla(342, 97%, 42%, 0.8)',
                    }
                  : backdropStyle
              }
              style={{blockSize: Tag === 'textarea' ? '94%' : '100%'}}
            />
          )}
        </div>
        {children}
        {invalidMsg && <small className={cls.errorMsg}>{invalidMsg}</small>}
      </motion.section>
      {ctrlChildren}
    </div>
  );
});

export default Input;
