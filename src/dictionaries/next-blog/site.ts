import {Locale} from '@/l10n/next-blog/l10n.types';

const site = (locale: Locale) => {
  const dict = {
    ar: {
      title: 'مدونة نكست',
      description:
        'مدونتي في ميادينَ شتى، أبرزها برمجة الوِب والترجمة واللغة العربية.',
    },
    en: {
      title: 'Next Blog',
      description:
        'Read about different topics, mainly web development, translation, and the Arabic language.',
    },
  };
  return dict[locale];
};

export default site;
