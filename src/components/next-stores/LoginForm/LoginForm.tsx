'use client';

import {useSearchParams, useRouter, usePathname} from 'next/navigation';
import {useEffect} from 'react';
import ky from 'ky';
import useUser from '../useUser';
import useToaster from '@/components/Toaster/use-toaster';
import Form, {FormProps} from '@/components/Form';
import Input from '@/ui/Input';
import PasswordInput from '@/ui/PasswordInput';
import Spinner from '@/ui/Spinner';
import {type IUser} from '@/services/next-stores/user';
import {emailRegex, stringifyRegex} from '@/lib/regex';
import {getURL} from '@/utils/path';
import styles from './LoginForm.module.css';

export interface LoginFormProps
  extends Omit<FormProps, 'submitHandler' | 'children'> {
  endpoint?: string;
  badTokenMessage?: string;
}

const LoginForm = ({
  endpoint = '/api/auth/login',
  badTokenMessage = 'You must be logged in.',
  ...delegated
}: LoginFormProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {setUserData} = useUser();
  const email = searchParams.get('email');
  const error = searchParams.get('error');
  const redirect = searchParams.get('redirect');
  const success = searchParams.get('success');
  const {createToast} = useToaster();

  useEffect(() => {
    if (!error) return;
    error &&
      createToast(
        'error',
        <p>{error === 'bad_token' ? badTokenMessage : error}</p>,
        4800
      );
    success && createToast('success', <p>{success}</p>, 5000);
  }, [createToast, error, success, badTokenMessage]);

  const login = async (body: FormData) => {
    const res = await ky.post(getURL(endpoint), {
      json: Object.fromEntries(body.entries()),
      throwHttpErrors: false,
      timeout: 20000,
    });
    const json = (await res.json()) as {
      message: string;
      status: string;
      data: Omit<IUser, 'password'>;
    };
    if (json.status === 'error') {
      throw new Error(json.message);
    }
    if (json.status === 'success') {
      createToast(
        'success',
        <p>
          {json.message} <Spinner />
        </p>,
        2600
      );
      setUserData(json.data);
      router.replace(redirect ?? pathname);
      router.refresh();
    }
  };

  const throwError = (error: Error) => {
    createToast('error', <p>{error.message}</p>, 10000);
  };

  return (
    <Form
      className={styles.form}
      submitHandler={login}
      errorHandler={throwError}
      submitText='Log In →'
      {...delegated}
    >
      <Input
        name='email'
        label='Email'
        type='email'
        placeholder='Your email'
        aria-label='Your email'
        defaultValue={email ?? ''}
        required
        pattern={stringifyRegex(emailRegex)}
        title='Please enter a valid email address.'
      />
      <PasswordInput
        name='password'
        label='Password'
        placeholder='Your password'
        aria-label='Your password'
        required
      />
    </Form>
  );
};
export default LoginForm;
