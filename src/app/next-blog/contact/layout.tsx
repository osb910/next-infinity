import {type Metadata} from 'next';
import {type ReactNode} from 'react';
import cls from './ContactPage.module.css';

export const metadata: Metadata = {};

const ContactPageLayout = async ({children}: {children: ReactNode}) => {
  return <>{children}</>;
};

export default ContactPageLayout;
