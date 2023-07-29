'use client';

import {useState, FormEvent, ReactNode, ComponentProps} from 'react';
import Spinner from '../Spinner';
import styles from './Form.module.css';

interface FormProps extends ComponentProps<'form'> {
  title?: string;
  submitHandler: (body: any) => Promise<void>;
  errorHandler?: (error: Error) => void;
  submitText?: string;
  resetAfterSubmit?: boolean;
  children: ReactNode;
  className?: string;
  [idx: string]: any;
}

const Form = ({
  title,
  submitHandler,
  submitText = 'Submit',
  errorHandler,
  resetAfterSubmit = true,
  children,
  className,
  ...delegated
}: FormProps) => {
  const [submitting, setSubmitting] = useState(false);
  const submit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setSubmitting(true);
    try {
      const body = new FormData(evt.currentTarget);
      await submitHandler(body);
      if (resetAfterSubmit) evt.currentTarget.reset();
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
      <button disabled={submitting} type='submit' className={styles.button}>
        {submitText}
        {submitting && <Spinner size={20} />}
      </button>
    </form>
  );
};

export default Form;
