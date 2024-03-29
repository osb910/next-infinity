import Form from '@/ui/Form';
import PasswordInput from '@/ui/PasswordInput';
import {useToaster} from '@/ui/Toaster';
import ky from 'ky';
import {usePathname, useRouter} from 'next/navigation';

interface ChangePasswordFormProps {
  title?: string;
  resetPassword?: boolean;
  resetToken?: string;
  userId?: string;
}

const ChangePasswordForm = ({
  title = '',
  resetPassword,
  resetToken,
  userId,
}: ChangePasswordFormProps) => {
  const {createToast} = useToaster();
  const router = useRouter();
  const pathname = usePathname();

  const changePassword = async (
    data: Record<string, FormDataEntryValue | null>
  ) => {
    const res = await ky.patch(
      `/api/next-stores${
        resetPassword ? '/auth/reset-password' : '/auth/me/change-password'
      }`,
      {
        json: resetPassword
          ? {
              ...data,
              resetToken,
            }
          : data,
        headers: {
          'X-USER-ID': resetPassword ? undefined : userId,
        },
        throwHttpErrors: false,
        timeout: 20000,
      }
    );
    const json = (await res.json()) as {
      status: 'success' | 'warning' | 'error' | 'notice';
      message: string;
    };
    createToast(json.status, <p>{json.message}</p>, 5000);
    if (json.status === 'success') {
      setTimeout(() => {
        router.push(`${pathname}?dialog=login`);
      }, 3200);
    }
  };

  return (
    <Form
      title={title}
      submitText={resetPassword ? 'Reset' : 'Change' + ' Password'}
      onSave={changePassword}
    >
      {!resetPassword && (
        <PasswordInput
          label='Current Password'
          name='currentPassword'
          placeholder='Your current password'
          aria-label='Your current password'
          required
        />
      )}
      <PasswordInput
        label='New Password'
        name='newPassword'
        placeholder='Your new password'
        aria-label='Your new password'
        required
      />
      <PasswordInput
        label='Confirm New Password'
        name='confirmNewPassword'
        placeholder='Confirm your new password'
        aria-label='Confirm your new password'
        required
      />
    </Form>
  );
};

export default ChangePasswordForm;
