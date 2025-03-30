import {type Metadata} from 'next';
import {type ReactNode} from 'react';

export const metadata: Metadata = {};

const LoginLayout = async ({children}: {children: ReactNode}) => {
  return <>{children}</>;
};

export default LoginLayout;
