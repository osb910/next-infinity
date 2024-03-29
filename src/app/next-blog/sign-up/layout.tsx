import {type Metadata} from 'next';
import {type ReactNode} from 'react';
import styles from './SignUp.module.css';

export const metadata: Metadata = {};

const SignUpLayout = async ({children}: {children: ReactNode}) => {
  return <>{children}</>;
};

export default SignUpLayout;
