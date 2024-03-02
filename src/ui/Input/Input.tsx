'use client';

import {
  useId,
  forwardRef,
  useEffect,
  useState,
  type ReactNode,
  type ComponentPropsWithRef,
  type ChangeEvent,
  type FocusEvent,
  useRef,
} from 'react';
import {motion} from 'framer-motion';
import clsx from 'clsx';

import Asterisk from '@/ui/Asterisk';
import {delay} from '@/utils/promises';
import {removeGrammarlyTab} from './util';
import cls from './Input.module.css';
import MotionBackdrop from '../MotionBackdrop';

export type InputProps = ComponentPropsWithRef<'input'> &
  ComponentPropsWithRef<'textarea'> & {
    as?: 'input' | 'textarea';
    label?: string;
    setInput?: Function;
    children?: ReactNode;
    ctrlClass?: string;
    layoutId?: string;
    focused?: string;
    backdropStyle?: Record<string, any>;
    invalidMsg?: string;
    ctrlChildren?: ReactNode;
    removeExternalTabs?: boolean;
  };

export const Input = forwardRef(function Input(
  {
    as: Element = 'input',
    label,
    setInput,
    invalidMsg,
    children,
    ctrlChildren,
    ctrlClass,
    layoutId,
    focused,
    backdropStyle,
    removeExternalTabs = true,
    ...rest
  }: InputProps,
  ref: any
) {
  const appliedId = `${label?.toLowerCase?.() ?? ''}${useId()}`;
  const [isTouched, setIsTouched] = useState(false);
  const [isAttempted, setIsAttempted] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const validityState = inputRef.current?.validity;
  const isInValid =
    isAttempted && !validityState?.valueMissing && !validityState?.valid;

  useEffect(() => {
    if (Element !== 'textarea' || !isTouched || !removeExternalTabs) return;
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
  }, [Element, isTouched, removeExternalTabs]);

  return (
    <p className={clsx(cls.ctrl, ctrlClass)}>
      {label && (
        <label htmlFor={appliedId} tabIndex={-1} className={cls.label}>
          {label}
          {rest.required && (
            <Asterisk tabIndex={-1}>This field is required</Asterisk>
          )}
        </label>
      )}
      <motion.section className={cls.inputWrapper}>
        <div className={clsx(cls.input, isInValid && cls.invalid)}>
          <Element
            onChange={(evt: ChangeEvent): void =>
              setInput?.(
                Element === 'textarea'
                  ? (evt.target as HTMLTextAreaElement)
                  : (evt.target as HTMLInputElement)
              )
            }
            {...(Element === 'textarea'
              ? {rows: 4}
              : rest.type === 'number'
              ? {min: 1, step: 1}
              : {type: 'text'})}
            ref={ref ?? inputRef}
            {...rest}
            onFocus={(
              evt: FocusEvent<
                typeof Element extends 'input'
                  ? HTMLInputElement
                  : typeof Element extends 'textarea'
                  ? HTMLTextAreaElement
                  : any
              >
            ) => {
              setIsTouched(true);
              rest.onFocus?.(evt);
            }}
            onBlur={(
              evt: FocusEvent<
                typeof Element extends 'input'
                  ? HTMLInputElement
                  : typeof Element extends 'textarea'
                  ? HTMLTextAreaElement
                  : any
              >
            ) => {
              setIsAttempted(true);
              rest.onBlur?.(evt);
            }}
            id={appliedId}
            dir='auto'
            style={{...rest.style, zIndex: focused === rest.name ? 1 : 2}}
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
              style={{blockSize: Element === 'textarea' ? '94%' : '100%'}}
            />
          )}
        </div>
        {children}
        {invalidMsg && <small className={cls.errorMsg}>{invalidMsg}</small>}
      </motion.section>
      {ctrlChildren}
    </p>
  );
});

export default Input;
