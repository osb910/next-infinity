'use client';

import {
  useState,
  useImperativeHandle,
  useRef,
  forwardRef,
  type FormEvent,
  type ReactNode,
  type ComponentPropsWithRef,
} from 'react';
import clsx from 'clsx';
import {Submit} from './Submit';
import cls from './Form.module.css';

export interface FormHandle {
  clear: () => void;
}

export interface FormProps extends ComponentPropsWithRef<'form'> {
  children?: ReactNode;
  onSave?: (data: Record<string, FormDataEntryValue | null>) => Promise<void>;
  throwErr?: (error: Error) => void;
  title?: string;
  useSubmitBtn?: boolean;
  submitText?: string;
  resetAfterSubmit?: boolean;
  btnDisabled?: boolean;
}

const Form = forwardRef<FormHandle, FormProps>(function Form(
  {
    title,
    onSave,
    children,
    useSubmitBtn = true,
    submitText = 'Submit',
    throwErr,
    resetAfterSubmit = true,
    btnDisabled,
    ...rest
  },
  ref
) {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clearForm = () => {
    form.current?.reset();
    const formData = new FormData(form.current as HTMLFormElement);
    const inputs = [...formData.keys()].map(
      key =>
        form.current?.elements?.namedItem(key) as
          | HTMLInputElement
          | HTMLTextAreaElement
          | RadioNodeList
    );
    inputs.forEach(el => {
      if (NodeList.prototype.isPrototypeOf(el)) {
        (el as NodeList).forEach(subEl => {
          if (subEl instanceof HTMLInputElement) {
            subEl.checked = false;
          }
        });
        return;
      }
      el.value = '';
    });
  };

  const submit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(evt.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      await onSave?.(data);
      resetAfterSubmit && clearForm();
    } catch (err) {
      if (!(err instanceof Error)) return;
      console.error(err);
      throwErr?.(err);
    }
    setIsSubmitting(false);
  };

  useImperativeHandle(ref, () => {
    return {
      clear: clearForm,
    };
  });

  return (
    <form
      {...rest}
      {...(onSave && {onSubmit: submit})}
      className={clsx(cls.form, rest.className)}
      ref={form}
    >
      {title && <h2 className={cls.title}>{title}</h2>}
      {children}
      {useSubmitBtn && (
        <p className={cls.actions}>
          <Submit isSubmitting={isSubmitting} disabled={btnDisabled}>
            {submitText}
          </Submit>
        </p>
      )}
    </form>
  );
});

export default Form;
