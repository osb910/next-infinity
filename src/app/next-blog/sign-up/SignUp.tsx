import {type Metadata} from 'next';
import type {AppPage} from '@/types';
import SignUpForm from '@/components/next-blog/SignUpForm';
import {getLocale} from '@/l10n/getL10n';
import {localize} from '@/l10n';

export const metadata: Metadata = {
  title: 'Sign Up',
};

const SignUpPage: AppPage = async () => {
  const locale = await getLocale();
  const {l6e, dir} = await localize(locale);
  return (
    <SignUpForm
      l6e={l6e}
      dir={dir}
      locale={locale}
    />
  );
};

export default SignUpPage;
