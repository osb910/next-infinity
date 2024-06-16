import {Locale} from '@/l10n/next-blog/l10n.types';

const nav = (locale: Locale) => {
  const dict = {
    ar: {
      articles: 'Articles',
    },
    en: {
      articles: 'المقالات',
    },
  };
  return dict[locale];
};

export default nav;
