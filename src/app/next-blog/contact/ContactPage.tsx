import {type Metadata} from 'next';
import type {AppPage} from '@/types';
import cls from './ContactPage.module.css';
import ContactForm from '@/components/next-blog/ContactForm';

export type ContactPg = AppPage<{}>;

export const metadata: Metadata = {
  title: 'Contact',
};

const ContactPage: ContactPg = async ({}) => {
  return (
    <>
      <h1 className={cls.title}>Get in touch</h1>
      <ContactForm />
    </>
  );
};

export default ContactPage;
