import {type Metadata} from 'next';
import {type ReactNode} from 'react';

export const metadata: Metadata = {};

const ContactPageLayout = async ({children}: {children: ReactNode}) => {
  return <>{children}</>;
};

export default ContactPageLayout;
