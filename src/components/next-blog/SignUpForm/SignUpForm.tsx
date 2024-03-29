'use client';

import {useLayoutEffect} from 'react';
import {useFormState} from 'react-dom';
import signUp from '@/services/next-blog/user/actions/sign-up';
import {emailRegex, stringifyRegex} from '@/lib/text/regex';
import Form from '@/ui/Form';
import Input from '@/ui/Input';
import PasswordInput from '@/ui/PasswordInput';
import {useToaster} from '@/ui/Toaster';

interface SignUpFormProps {}

const SignUpForm = ({}: SignUpFormProps) => {
  const [formState, formAction] = useFormState(signUp, {
    status: 'idle',
    message: null,
    data: null,
  });
  const {createToast} = useToaster();

  useLayoutEffect(() => {
    if (formState.status === 'error' && formState.message) {
      createToast(formState.status, formState.message);
    }

    if (formState.status === 'success' && formState.message) {
      createToast(
        formState.status,
        <>
          <p>{formState.message}</p>
        </>,
        'infinite'
      );
    }
  }, [formState, createToast]);

  return (
    <Form
      action={formAction}
      submitText='Create Your Account'
      title='Create Account'
    >
      <Input
        label='First Name'
        name='firstName'
        placeholder='Your first name'
        aria-label='Your last name'
        required
      />
      <Input
        label='Last Name'
        name='lastName'
        placeholder='Your last name'
        aria-label='Your last name'
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

export default SignUpForm;
