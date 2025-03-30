import {Locale} from '@/l10n/l10n.types';

const nav = (locale: Locale, options?: Record<string, any>) => {
  const dict = {
    ar: {
      home: 'المدخل',
      articles: 'المقالات',
      categories: 'الأبواب',
      contact: 'راسلني',
    },
    en: {
      home: 'Homepage',
      articles: 'Articles',
      categories: 'Categories',
      contact: 'Contact',
    },
  };
  return dict[locale];
};

export default nav;
