'use client';

import {useRouter, usePathname} from 'next/navigation';
import ky from 'ky';
import {useToaster} from '@/ui/Toaster';
import Form from '@/ui/Form';
import Input from '@/ui/Input';
import PasswordInput from '@/ui/PasswordInput';
import {emailRegex, stringifyRegex} from '@/lib/text/regex';
import {getURL} from '@/utils/path';
import Spinner from '@/ui/Spinner';
// import styles from './RegisterForm.module.css';

export type Response =
  | {status: 'error'; errors?: {message: string}[]; message?: string}
  | {
      status: 'warning' | 'notice';
      message: string;
      [idx: string]: any;
    }
  | {
      status: 'success';
      message: string;
      data: Record<string, any>;
    };

const RegisterForm = () => {
  const {createToast} = useToaster();
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname);

  const signUp = async (data: Record<string, FormDataEntryValue | null>) => {
    try {
      const res = await ky.post(getURL('/api/next-stores/auth/register'), {
        json: data,
        throwHttpErrors: false,
        timeout: 20000,
      });
      const json = (await res.json()) as Response;
      if (json.status !== 'success') {
        json?.errors?.forEach(({message}: {message: string}) => {
          createToast(json.status, message);
        });
        if (json?.message) createToast(json.status, <p>{json.message}</p>);
        return;
      }

      if (json.status === 'success') {
        createToast(
          'success',
          <p>
            {json.message} <Spinner />
          </p>,
          2400
        );
        setTimeout(() => {
          router.push(`${pathname}?dialog=login&email=${data.email}`);
        }, 2800);
      }
    } catch (err) {
      if (!(err instanceof Error)) return;
      console.error(err);
    }
  };
  return (
    <Form
      // className={styles.form}
      onSave={signUp}
      submitText='Register'
    >
      <Input
        label='Name'
        name='name'
        placeholder='Your name'
        aria-label='Your name'
        required
      />
      <Input
        type='email'
        label='Email'
        name='email'
        placeholder='Your email'
        aria-label='Your email'
        required
        pattern={stringifyRegex(emailRegex)}
        title='Please enter a valid email address.'
      />
      <PasswordInput
        label='Password'
        name='password'
        placeholder='Your password'
        aria-label='Your password'
        required
      />
      <PasswordInput
        label='Confirm Password'
        name='confirmPassword'
        placeholder='Confirm your password'
        aria-label='Confirm your password'
        required
      />
    </Form>
  );
};
export default RegisterForm;
