'use client';

import {useSearchParams, useRouter, usePathname} from 'next/navigation';
import {useEffect} from 'react';
import ky from 'ky';
import Form from '@/components/Form/Form';
import Input from '@/components/Input';
import PasswordInput from '@/components/PasswordInput';
import useToaster from '@/components/Toaster/use-toaster';
import {emailRegex, stringifyRegex} from '@/lib/regex';
import {getURL} from '@/utils/path';
import {IUser} from '@/entities/next-stores/user/user.model';
import Spinner from '@/components/Spinner';
import styles from './LoginForm.module.css';

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const email = searchParams.get('email');
  const error = searchParams.get('error');
  const redirect = searchParams.get('redirect');
  const {createToast} = useToaster();

  useEffect(() => {
    error === 'bad_token' &&
      createToast('error', <p>You must be logged in.</p>, 2400);
  }, []);

  const login = async (body: FormData) => {
    const res = await ky.post(getURL('/api/next-stores/auth/login'), {
      json: Object.fromEntries(body.entries()),
      throwHttpErrors: false,
      timeout: 20000,
    });
    const json = (await res.json()) as {
      data: {nextStoresToken: string; nextStoresUserId: string};
      message: string;
      status: string;
    };
    if (json.status === 'error') {
      createToast('error', <p>{json.message}</p>, 20000);
    }
    if (json.status === 'success') {
      createToast(
        'success',
        <p>
          {json.message} <Spinner />
        </p>,
        2800
      );
      setTimeout(() => {
        router.push(redirect ?? pathname);
      }, 2800);
    }
  };

  return (
    <Form className={styles.form} submitHandler={login} submitText='Log In →'>
      <Input
        name='email'
        label='Email Address'
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