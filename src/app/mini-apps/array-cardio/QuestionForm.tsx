'use client';
import styles from './QuestionForm.module.css';
import {FormEvent, ReactNode} from 'react';

interface QuestionFormProps {
  children: ReactNode;
  className?: string;
  process: (data: any) => any;
}

const QuestionForm = ({children, className, process}: QuestionFormProps) => {
  const submit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const formData = new FormData(evt.currentTarget);
    const data = Object.fromEntries(formData.entries());
    process(data);
  };
  return (
    <form onSubmit={submit} className={`${className} ${styles.form}`}>
      {children}
      <button className={styles.ask} type='submit'>
        ?
      </button>
    </form>
  );
};

export default QuestionForm;
