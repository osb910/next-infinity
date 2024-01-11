'use client';

import {
  useState,
  type FormEvent,
  type ReactNode,
  type ComponentProps,
} from 'react';
import Spinner from '@/ui/Spinner';
import styles from './Form.module.css';

export interface FormProps extends ComponentProps<'form'> {
  children: ReactNode;
  submitHandler?: (body: FormData) => Promise<void>;
  errorHandler?: (error: Error) => void;
  title?: string;
  useSubmitButton?: boolean;
  submitText?: string;
  resetAfterSubmit?: boolean;
  buttonDisabled?: boolean;
}

const Form = ({
  title,
  submitHandler,
  children,
  useSubmitButton = true,
  submitText = 'Submit',
  errorHandler,
  resetAfterSubmit = true,
  buttonDisabled,
  ...delegated
}: FormProps) => {
  const [submitting, setSubmitting] = useState(false);
  const submit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setSubmitting(true);

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
      errorHandler?.(err);
    }
    setSubmitting(false);
  };

  return (
    <form
      {...(delegated.action && {action: delegated.action})}
      {...(submitHandler && {onSubmit: submit})}
      {...delegated}
      className={`${styles.form} ${delegated.className ?? ''}`}
    >
      {title && <h2 className={styles.title}>{title}</h2>}
      {children}
      {useSubmitButton && (
        <button
          type='submit'
          disabled={submitting || buttonDisabled}
          className={styles.submit}
        >
          {submitText}
          {submitting && <Spinner size={22} />}
        </button>
      )}
    </form>
  );
};

export default Form;
