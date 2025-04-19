import type {Locale} from '@/l10n/l10n.types';

const contact = (locale: Locale, options?: Record<string, any>) => {
  const dict = {
    ar: {
      title: 'راسلني',
      heading: 'اتصل بي',
      emailLabel: 'بريدك',
      emailTitle: 'ضع بريدًا صالحًا.',
      nameLabel: 'الاسم',
      messageLabel: 'الرسالة',
      messagePlaceholder: 'بمَ أساعدك؟',
      requiredField: 'هذه الخانة مطلوبة',
      sendBtn: 'أرسِل',
    },
    en: {
      title: 'Contact',
      heading: 'Get in Touch',
      emailLabel: 'Your Email',
      emailTitle: 'Please enter a valid email address.',
      nameLabel: 'Your Name',
      messageLabel: 'Your Message',
      messagePlaceholder: 'How can I help you?',
      requiredField: 'This field is required',
      sendBtn: 'Send Message',
    },
  };
  return dict[locale];
};

export default contact;
