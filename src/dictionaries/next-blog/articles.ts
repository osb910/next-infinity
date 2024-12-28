import type {Locale} from '@/l10n/l10n.types';

const articles = (locale: Locale) => {
  const dict = {
    ar: {},
    en: {},
  };
  return dict[locale];
};

export default articles;
