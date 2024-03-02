'use client';

import {
  useState,
  type FormEvent,
  type ReactNode,
  type ComponentPropsWithoutRef,
} from 'react';
import clsx from 'clsx';
import {Submit} from './Submit';
import cls from './Form.module.css';

export interface FormProps extends ComponentPropsWithoutRef<'form'> {
  children?: ReactNode;
  submitHandler?: (body: FormData) => Promise<void>;
  throwErr?: (error: Error) => void;
  title?: string;
  useSubmitBtn?: boolean;
  submitText?: string;
  resetAfterSubmit?: boolean;
  btnDisabled?: boolean;
}

const Form = ({
  title,
  submitHandler,
  children,
  useSubmitBtn = true,
  submitText = 'Submit',
  throwErr,
  resetAfterSubmit = true,
  btnDisabled,
  ...delegated
}: FormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setIsSubmitting(true);

    const body = new FormData(evt.currentTarget);
    const elements = evt.currentTarget.elements;
    const inputs = [...body.keys()].map(
      k =>
        elements.namedItem(k) as
          | HTMLInputElement
          | HTMLTextAreaElement
          | RadioNodeList
    );

    try {
      await submitHandler?.(body);

      if (resetAfterSubmit) {
        inputs.forEach(el => {
          if (NodeList.prototype.isPrototypeOf(el)) {
            (el as NodeList).forEach(e => {
              if (e instanceof HTMLInputElement) {
                e.checked = false;
              }
            });
            return;
          }
          el.value = '';
        });
      }
    } catch (err) {
      if (!(err instanceof Error)) return;
      console.error(err);
      throwErr?.(err);
    }
    setIsSubmitting(false);
  };

  return (
    <form
      {...delegated}
      {...(submitHandler && {onSubmit: submit})}
      className={clsx(cls.form, delegated.className)}
    >
      {title && <h2 className={cls.title}>{title}</h2>}
      {children}
      <p className={cls.actions}>
        {useSubmitBtn && (
          <Submit isSubmitting={isSubmitting} disabled={btnDisabled}>
            {submitText}
          </Submit>
        )}
      </p>
    </form>
  );
};

export default Form;
