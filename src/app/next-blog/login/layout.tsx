import {type Metadata} from 'next';
import {type ReactNode} from 'react';
import styles from './Login.module.css';

export const metadata: Metadata = {};

const LoginLayout = async ({children}: {children: ReactNode}) => {
  return (
    <>{children}</>
  );
};

export default LoginLayout;
