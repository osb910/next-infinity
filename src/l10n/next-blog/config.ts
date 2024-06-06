import {env} from '@/lib/helpers';
import {Locale} from './l10n.types';

export const languages = {
  ar: {
    name: 'العربية',
    engName: 'Arabic',
    code: 'ar',
    dir: 'rtl',
    dictionary: async () =>
      (await import('../../dictionaries/next-blog/ar')).default,
  },
  en: {
    name: 'English',
    engName: 'English',
    code: 'en',
    dir: 'ltr',
    dictionary: async () =>
      (await import('../../dictionaries/next-blog/en')).default,
  },
};
export const defaultLocale = (env('DEFAULT_LOCALE') ?? 'en') as Locale;

export const locales = Object.keys(languages) as Array<Locale>;
