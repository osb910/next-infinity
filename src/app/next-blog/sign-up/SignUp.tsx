import {type Metadata} from 'next';
import type {AppPage, JsonRes} from '@/types';
import SignUpForm from '@/components/next-blog/SignUpForm';

export const metadata: Metadata = {
  title: 'Sign Up',
};

const SignUpPage: AppPage<{}> = async ({}) => {
  return <SignUpForm />;
};

export default SignUpPage;
