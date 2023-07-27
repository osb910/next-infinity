'use client';

import {useSearchParams, useRouter} from 'next/navigation';
import ky from 'ky';
import Form from '@/components/Form/Form';
import Input from '@/components/Input';
import PasswordInput from '@/components/PasswordInput';
import useToaster from '@/components/Toaster/use-toaster';
import {emailRegex, stringifyRegex} from '@/lib/regex';
import {getURL} from '@/utils/path';
import {IUser} from '@/entities/next-stores/user/user.model';
import Spinner from '@/components/Spinner';

const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {createToast} = useToaster();
  const email = searchParams.get('email');

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
    console.log(json);
    if (json.status === 'error') {
      createToast('error', <p>{json.message}</p>, 20000);
    }
    if (json.status === 'success') {
      createToast(
        'success',
        <p>
          {json.message} <Spinner size={20} />
        </p>,
        2400
      );
      setTimeout(() => {
        router.push(`/next-stores`);
      }, 2800);
    }
  };

  return (
    <Form title='Login' onSubmit={login} submitText='Log In →'>
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
export default Login;
