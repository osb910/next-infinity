import {env} from '@/lib/helpers';
import type {Locale} from './l10n.types';
import type {Dir} from '@/types';

export const languages = {
  ar: {
    name: 'العربية',
    engName: 'Arabic',
    code: 'ar',
    dir: 'rtl',
  },
  en: {
    name: 'English',
    engName: 'English',
    code: 'en',
    dir: 'ltr',
  },
};

export const defaultLocale = (env('DEFAULT_LOCALE') ?? 'en') as Locale;

export const locales = Object.keys(languages) as Array<Locale>;

export const langs = Object.values(languages).map((lang) => ({
  ...lang,
  dir: lang.dir as Dir,
}));
