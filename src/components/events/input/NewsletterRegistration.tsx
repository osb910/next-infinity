'use client';

import {FormEvent, useState} from 'react';
import styles from './NewsletterRegistration.module.css';
import useInput from '@/hooks/useInput';
import Spinner from '@/ui/Spinner/Spinner';
import useToaster from '../../Toaster/use-toaster';
import {isEmail} from '@/utils/validators';
import ky from 'ky';

const NewsletterRegistration = () => {
  const {value, inputRef, changeValue, hasError, onBlur, reset} = useInput(
    value => isEmail(value)
  );
  const [loading, setLoading] = useState(false);
  const {createToast} = useToaster();
  const register = async (evt: FormEvent) => {
    evt.preventDefault();
    if (hasError) return;
    setLoading(true);
    try {
      const json: any = await ky
        .post('/api/events/subscribe', {
          json: {email: value.trim()},
          throwHttpErrors: false,
        })
        .json();

      createToast(json.status, json.message);
      reset();
    } catch (err) {
      if (!(err instanceof Error)) return;
      console.error(err);
      createToast('error', `Something went wrong. ${err.message}`);
    }
    setLoading(false);
  };

  return (
    <section className={styles.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={register}>
        <p className={`${styles.control} ${hasError ? styles.invalid : ''}`}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            value={value}
            ref={inputRef}
            onChange={changeValue}
            onBlur={onBlur}
            pattern={`\\b[\\-\\w!#$%&'*+\\/=?^_\`\\{\\|\\}~]+(?:\\.[\\-\\w!#$%&'*+\\/=?^_\`\\{\\|\\}~]+)*@(?:\\w(?:[\\-\\w]*\\w)?\\.)+\\w(?:[\\-\\w]*\\w)?\\b`}
            required
            title='Please enter a valid email address.'
          />
          <button disabled={loading}>
            Register
            {loading && <Spinner />}
          </button>
        </p>
        {hasError && (
          <p className={styles.error}>Please enter a valid email.</p>
        )}
      </form>
    </section>
  );
};

export default NewsletterRegistration;
