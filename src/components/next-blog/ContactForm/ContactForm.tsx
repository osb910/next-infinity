'use client';

import {useId, useLayoutEffect, useRef, useState} from 'react';
import {LayoutGroup} from 'framer-motion';
import {useFormState} from 'react-dom';

import {emailRegex, stringifyRegex} from '@/lib/text/regex';
import Form, {Submit, type FormHandle} from '@/ui/Form';
import Input from '@/ui/Input';
import {useToaster} from '@/ui/Toaster';
import MotionBackdrop from '@/ui/MotionBackdrop';
import {sendMessage} from './actions';

import cls from './ContactForm.module.css';
import clsx from 'clsx';
import {TIME} from '@/constants/numbers';

interface ContactFormProps {}

const initial = {
  borderRadius: 6,
  boxShadow: '0 0 0 2px var(--blog-decorative-800)',
};

const ContactForm = ({}: ContactFormProps) => {
  const [formState, formAction] = useFormState(sendMessage, {
    status: 'notice',
    message: null,
    data: null,
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

  return (
    <LayoutGroup>
      <Form
        className={clsx(
          cls.form,
          formState.status === 'success' && !isCleared && cls.cleared
        )}
        useSubmitBtn={false}
        action={formAction}
        ref={form}
        // BUG: fires on all inputs, cancels animation
        // onBlur={() => setFocused('')}
      >
        <Input
          label='Your Email'
          type='email'
          name='email'
          required
          pattern={stringifyRegex(emailRegex)}
          title='Please enter a valid email address.'
          onFocus={() => changeFocused('email')}
          // animate={formState.status === 'success' && {color: 'transparent'}}
          // transition={{type: 'spring'}}
          autoFocus
          focused={focused}
          layoutId={layoutId}
          backdropStyle={initial}
          invalidMsg={errors?.email?.[0]}
        />
        <Input
          label='Your Name'
          name='name'
          required
          onFocus={() => changeFocused('name')}
          focused={focused}
          layoutId={layoutId}
          backdropStyle={initial}
          invalidMsg={errors?.name?.[0]}
        />
        <Input
          as='textarea'
          label='Your Message'
          name='message'
          placeholder='How can I help you?'
          required
          onFocus={() => changeFocused('message')}
          focused={focused}
          layoutId={layoutId}
          backdropStyle={initial}
          invalidMsg={errors?.message?.[0]}
        />
        <Submit
          onFocus={() => changeFocused('submit')}
          whileHover={{scale: 1.05}}
          whileFocus={{scale: 1.05}}
          whileTap={{scale: 0.95}}
        >
          Send Message
          {focused === 'submit' && (
            <MotionBackdrop layoutId={layoutId} initial={initial} />
          )}
        </Submit>
      </Form>
    </LayoutGroup>
  );
};

export default ContactForm;
