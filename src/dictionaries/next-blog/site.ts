import {Locale} from '@/l10n/l10n.types';

const site = (locale: Locale, options?: Record<string, any>) => {
  const dict = {
    ar: {
      title: 'مدونة نكست',
      description:
        'مدونتي في ميادينَ شتى، أبرزها برمجة الوِب والترجمة واللغة العربية.',
      logo: 'شعار مدونة نِكست',
    },
    en: {
      title: 'Next Blog',
      description:
        'Read about different topics, mainly web development, translation, and the Arabic language.',
      logo: 'Next Blog logo',
    },
  };
  return dict[locale];
};

export default site;
