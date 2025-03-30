'use client';

import {useActionState, useId, useLayoutEffect, useRef, useState} from 'react';
import {LayoutGroup} from 'framer-motion';

import {emailRegex, stringifyRegex} from '@/lib/text/regex';
import Form, {Submit, type FormHandle} from '@/ui/Form';
import Input from '@/ui/Input';
import {useToaster} from '@/ui/Toaster';
import MotionBackdrop from '@/ui/MotionBackdrop';
import {sendMessage} from './actions';

import cls from './ContactForm.module.css';
import clsx from 'clsx';
import {TIME} from '@/utils/constants';
import {Dir, PathValue} from '@/types';
import {Dictionary} from '@/l10n';

interface ContactFormProps {
  l10n: PathValue<Dictionary, ['nextBlog', 'contact']>;
  dir: Dir;
}

const initial = {
  borderRadius: 6,
  boxShadow: '0 0 0 2px var(--blog-decorative-800)',
};

const ContactForm = ({l10n, dir}: ContactFormProps) => {
  const [formState, formAction] = useActionState(sendMessage, {
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

    if (formState.status === 'error' && formState.message) toast();

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
          label={l10n.emailLabel}
          type='email'
          name='email'
          required
          pattern={stringifyRegex(emailRegex)}
          title={l10n.emailTitle}
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
          label={l10n.nameLabel}
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
          label={l10n.messageLabel}
          name='message'
          dir={dir}
          placeholder={l10n.messagePlaceholder}
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
          {l10n.sendBtn}
          {focused === 'submit' && (
            <MotionBackdrop
              layoutId={layoutId}
              initial={initial}
            />
          )}
        </Submit>
      </Form>
    </LayoutGroup>
  );
};

export default ContactForm;
