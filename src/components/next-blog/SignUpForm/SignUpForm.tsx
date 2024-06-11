'use client';

import {useEffect, useId, useLayoutEffect, useRef, useState} from 'react';
import {useFormState} from 'react-dom';
import {LayoutGroup} from 'framer-motion';
import clsx from 'clsx';
import signUp from '@/services/next-blog/actions/sign-up';
import {emailRegex, stringifyRegex} from '@/lib/text/regex';
import {TIME} from '@/constants/numbers';
import Form, {FormHandle} from '@/ui/Form';
import Input from '@/ui/Input';
import PasswordInput from '@/ui/PasswordInput';
import {useToaster} from '@/ui/Toaster';
import cls from './SignUpForm.module.css';
import type {Dictionary, L6e, Locale} from '@/l10n/next-blog/l10n.types';
import type {Dir} from '@/types';

interface SignUpFormProps {
  l6e: L6e;
  locale: Locale;
  dir: Dir;
}

const initial = {
  borderRadius: 6,
  boxShadow: '0 0 0 2px var(--blog-decorative-800)',
};

const SignUpForm = ({l6e, locale, dir}: SignUpFormProps) => {
  const [formState, formAction] = useFormState(signUp, {
    status: 'notice',
    message: null,
    data: null,
    locale,
  });
  const [focused, setFocused] = useState('');
  const [isCleared, setIsCleared] = useState(false);
  const form = useRef<HTMLFormElement & FormHandle>(null);
  const {errors} = formState.data ?? {};
  const {createToast} = useToaster();
  const layoutId = `backdrop${useId()}`;

  const changeFocused = (slug: string) => setFocused(slug);

  useLayoutEffect(() => {
    const toast = () =>
      createToast(formState.status, <p>{formState.message}</p>, 'infinite');

    formState.status === 'error' && formState.message && toast();

    if (formState.status === 'success' && formState.message) {
      toast();
      setTimeout(() => {
        form.current?.clear();
        setIsCleared(true);
      }, TIME.goldenSec / 1.5);
    }
  }, [formState, createToast]);

  useEffect(() => {
    document.body.addEventListener('click', (evt) => {
      const form = (evt.target as HTMLBodyElement).closest(`.${cls.form}`);
      !form && changeFocused('');
    });
  }, []);

  return (
    <LayoutGroup>
      <Form
        className={clsx(
          cls.form,
          cls[dir],
          formState.status === 'success' && !isCleared && cls.cleared
        )}
        action={formAction}
        ref={form}
        submitText='Create Your Account'
        title='Create Account'
      >
        <Input
          label='First Name'
          name='firstName'
          placeholder='Your first name'
          aria-label='Your last name'
          required
          // asteriskText={l10n['form.required']}
          onFocus={() => changeFocused('firstName')}
          autoFocus
          focused={focused}
          layoutId={layoutId}
          backdropStyle={initial}
          invalidMsg={errors?.firstName?.[0]}
        />
        <Input
          label='Last Name'
          name='lastName'
          placeholder='Your last name'
          aria-label='Your last name'
          onFocus={() => changeFocused('lastName')}
          focused={focused}
          layoutId={layoutId}
          backdropStyle={initial}
          invalidMsg={errors?.lastName?.[0]}
        />
        <Input
          type='email'
          label='Email'
          name='email'
          placeholder='Your email'
          aria-label='Your email'
          required
          title='Please enter a valid email address.'
          // asteriskText={l10n['form.required']}
          pattern={stringifyRegex(emailRegex)}
          onFocus={() => changeFocused('email')}
          focused={focused}
          layoutId={layoutId}
          backdropStyle={initial}
          invalidMsg={errors?.email?.[0]}
        />
        <PasswordInput
          label='Password'
          placeholder='Your password'
          aria-label='Your password'
          required
          // asteriskText={l10n['form.required']}
          onFocus={() => changeFocused('password')}
          focused={focused}
          layoutId={layoutId}
          backdropStyle={initial}
          invalidMsg={errors?.password?.[0]}
        />
        <PasswordInput
          label='Confirm Password'
          name='confirmPassword'
          placeholder='Confirm your password'
          aria-label='Confirm your password'
          // asteriskText={l10n['form.required']}
          required
          onFocus={() => changeFocused('confirmPassword')}
          focused={focused}
          layoutId={layoutId}
          backdropStyle={initial}
          invalidMsg={errors?.confirmPassword?.[0]}
        />
      </Form>
    </LayoutGroup>
  );
};

export default SignUpForm;
