'use client';

import {useState, FormEvent, ReactNode} from 'react';
import Spinner from '../Spinner';
import styles from './Form.module.css';

interface FormProps {
  title?: string;
  onSubmit: (body: FormData) => Promise<void>;
  onError?: (error: Error) => void;
  submitText?: string;
  resetAfterSubmit?: boolean;
  children: ReactNode;
  [idx: string]: any;
}

const Form = ({
  title,
  onSubmit,
  submitText = 'Submit',
  onError,
  resetAfterSubmit = true,
  children,
  ...delegated
}: FormProps) => {
  const [submitting, setSubmitting] = useState(false);
  const submit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setSubmitting(true);
    try {
      const body = new FormData(evt.currentTarget);
      await onSubmit(body);
      if (resetAfterSubmit) evt.currentTarget.reset();
    } catch (err) {
      if (!(err instanceof Error)) return;
      console.error(err);
      onError?.(err);
    }
    setSubmitting(false);
  };

  return (
    <form className={styles.form} onSubmit={submit} {...delegated}>
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
