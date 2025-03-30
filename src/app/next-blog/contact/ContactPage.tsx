import {getLocale} from '@/l10n/getL10n';
import {localize} from '@/l10n';
import ContactForm from '@/components/next-blog/ContactForm';
import type {AppPage, GetMetadata} from '@/types';
import cls from './ContactPage.module.css';

export type ContactPg = AppPage;

export const generateMetadata: GetMetadata = async () => {
  const locale = await getLocale();
  const {l6e} = await localize(locale);
  return {
    title: l6e('nextBlog.contact.title'),
  };
};

const ContactPage: ContactPg = async () => {
  const locale = await getLocale();
  const {l10n, l6e, dir} = await localize(locale);
  return (
    <>
      <h1 className={cls.title}>{l6e('nextBlog.contact.heading')}</h1>
      <ContactForm
        l10n={l10n.nextBlog.contact}
        dir={dir}
      />
    </>
  );
};

export default ContactPage;
