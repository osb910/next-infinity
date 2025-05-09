'use client';
import Form from '@/ui/Form';
import Input from '@/ui/Input';
import {useToaster} from '@/ui/Toaster';
import {emailRegex, stringifyRegex} from '@/lib/text/regex';
import ky from 'ky';

const ForgotPassForm = () => {
  const {createToast} = useToaster();
  const resetPassword = async (
    data: Record<string, FormDataEntryValue | null>
  ) => {
    const res = await ky.post('/api/next-stores/auth/reset-password', {
      json: data,
      throwHttpErrors: false,
      timeout: 20000,
    });
    const json = (await res.json()) as {
      status: 'success' | 'warning' | 'error' | 'notice';
      message: string;
    };
    console.log(json);
    createToast(json.status, <p>{json.message}</p>, 5000);
  };
  return (
    <Form
      title='Forgot Password'
      submitText='Reset My Password'
      onSave={resetPassword}
    >
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
    </Form>
  );
};

export default ForgotPassForm;
