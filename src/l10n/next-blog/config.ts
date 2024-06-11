import {env} from '@/lib/helpers';
import type {Locale} from './l10n.types';
import {Dir} from '@/types';

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

export const langs = Object.values(languages).map((lang) => {
  const {dictionary, ...rest} = lang;
  return {...rest, dir: rest.dir as Dir};
});
