'use client';

import Form from '@/components/Form';
import Input from '@/ui/Input';
import {type IUser} from '@/services/next-stores/user';
import {emailRegex, stringifyRegex} from '@/lib/regex';
import ky from 'ky';
import useToaster from '@/components/Toaster/use-toaster';

interface EditAccountFormProps {
  user: IUser;
}

const EditAccountForm = ({user}: EditAccountFormProps) => {
  const {createToast} = useToaster();

  const updateAccount = async (body: FormData) => {
    const res = await ky.put('/api/next-stores/auth/me', {
      json: Object.fromEntries(body.entries()),
      headers: {
        'X-USER-ID': user._id,
      },
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
      title='Edit Your Account'
      submitText='Update My Account'
      submitHandler={updateAccount}
    >
      <Input label='Name' name='name' defaultValue={user?.name} />
      <Input
        type='email'
        label='Email'
        name='email'
        defaultValue={user?.email}
        required
        pattern={stringifyRegex(emailRegex)}
        title='Please enter a valid email address.'
      />
    </Form>
  );
};

export default EditAccountForm;
