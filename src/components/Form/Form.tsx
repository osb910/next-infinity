'use client';

import {useState, FormEvent, ReactNode, ComponentProps} from 'react';
import Spinner from '../Spinner';
import styles from './Form.module.css';

interface FormProps extends ComponentProps<'form'> {
  title?: string;
  submitHandler: (body: any) => Promise<void>;
  children: ReactNode;
  className?: string;
  submitText?: string;
  errorHandler?: (error: Error) => void;
  resetAfterSubmit?: boolean;
  buttonDisabled?: boolean;
}

const Form = ({
  title,
  submitHandler,
  children,
  className,
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
    try {
      const body = new FormData(evt.currentTarget);
      const elements = evt.currentTarget.elements;
      const inputs = [...body.keys()].map(
        k =>
          elements.namedItem(k) as
            | HTMLInputElement
            | HTMLInputElement
            | HTMLTextAreaElement
      );
      await submitHandler(body);
      if (resetAfterSubmit) {
        inputs.forEach(el => (el.value = ''));
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
      className={`${className ?? ''} ${styles.form}`}
      onSubmit={submit}
      {...delegated}
    >
      {title && <h2 className={styles.title}>{title}</h2>}
      {children}
      <button
        type='submit'
        disabled={submitting || buttonDisabled}
        className={styles.submit}
      >
        {submitText}
        {submitting && <Spinner size={22} />}
      </button>
    </form>
  );
};

export default Form;
