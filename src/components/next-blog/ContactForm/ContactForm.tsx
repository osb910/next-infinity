'use client';

import {useId, useLayoutEffect, useState} from 'react';
import {LayoutGroup} from 'framer-motion';
import {useFormState} from 'react-dom';

import {emailRegex, stringifyRegex} from '@/lib/text/regex';
import Form, {Submit} from '@/ui/Form';
import Input from '@/ui/Input';
import {useToaster} from '@/ui/Toaster';
import MotionBackdrop from '@/ui/MotionBackdrop';
import {sendMessage} from './actions';

import cls from './ContactForm.module.css';

interface ContactFormProps {}

const initial = {
  borderRadius: 6,
  boxShadow: '0 0 0 2px var(--blog-decorative-800)',
};

const ContactForm = ({}: ContactFormProps) => {
  const [formState, formAction] = useFormState(sendMessage, {
    status: 'idle',
    message: null,
    data: null,
  });
  const {errors} = formState.data ?? {};
  const [focused, setFocused] = useState('');
  const {createToast} = useToaster();
  const layoutId = `backdrop${useId()}`;

  const changeFocused = (slug: string) => setFocused(slug);

  useLayoutEffect(() => {
    if (formState.status === 'error' && formState.message) {
      createToast(formState.status, formState.message);
    }

    if (formState.status === 'success' && formState.message) {
      createToast(formState.status, <p>{formState.message}</p>, 'infinite');
    }
  }, [formState, createToast]);

  return (
    <LayoutGroup>
      <Form
        className={cls.form}
        useSubmitBtn={false}
        action={formAction}
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
