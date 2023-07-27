'use client';

import {useRouter} from 'next/navigation';
import ky from 'ky';
import useToaster from '@/components/Toaster/use-toaster';
import Form from '@/components/Form/Form';
import Input from '@/components/Input';
import PasswordInput from '@/components/PasswordInput';
import {emailRegex, stringifyRegex} from '@/lib/regex';
import {getURL} from '@/utils/path';
import Spinner from '@/components/Spinner';

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

const Register = async () => {
  const {createToast} = useToaster();
  const router = useRouter();

  const signUp = async (body: FormData) => {
    try {
      const res = await ky.post(getURL('/api/next-stores/auth/register'), {
        json: Object.fromEntries(body.entries()),
        throwHttpErrors: false,
        timeout: 20000,
      });
      const json = (await res.json()) as Response;
      if (json.status !== 'success') {
        json?.errors?.forEach(({message}: {message: string}) => {
          createToast(json.status, message);
        });
        json?.message && createToast(json.status, <p>{json.message}</p>);
        return;
      }

      if (json.status === 'success') {
        createToast(
          'success',
          <>
            <p>{json.message}</p>
            <p>
              Redirecting... <Spinner />
            </p>
          </>,
          2400
        );
        setTimeout(() => {
          router.push(`/next-stores/login?email=${body.get('email')}`);
        }, 2800);
      }
    } catch (err) {
      if (!(err instanceof Error)) return;
      console.error(err);
    }
  };
  return (
    <Form onSubmit={signUp} submitText='Register' title='Register'>
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
export default Register;
