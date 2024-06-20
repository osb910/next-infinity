import Negotiator from 'negotiator';
import {cache} from 'react';
import {match} from '@formatjs/intl-localematcher';
import {defaultLocale, languages, locales} from './config';
import {getDeepProp} from '@/utils/general';
import {type NextRequest} from 'next/server';
import type {Dictionary, DottedL10n, Locale} from './l10n.types';
import type {Dir, DotPathValue, DottedPaths} from '@/types';
import {cookies} from 'next/headers';
import THE_DICTIONARY from '@/dictionaries/the-dictionary';

export const readLocale = (req: NextRequest) => {
  const languages = new Negotiator({
    headers: Object.fromEntries(req.headers.entries()),
  }).languages();

  return match(languages, locales, defaultLocale);
};

export const getLocale = cache(() => {
  const locale = (cookies().get('locale')?.value ?? defaultLocale) as Locale;
  return locale;
});

export const localize = cache(
  async <T extends keyof Dictionary | '' | undefined>({
    locale,
    path = '',
  }: {
    locale?: Locale;
    path?: T;
  } = {}) => {
    const usedLocale = locale ?? defaultLocale;

    // let dictionary = await languages[usedLocale].dictionary();
    const dictionary = THE_DICTIONARY(usedLocale);

    // if (path) {
    //   const deepDictionary = dictionary[path] as Dictionary[T];
    // }

    const l6e = <L extends DottedPaths<Dictionary>>(key: L) => {
      // const deepDictionary = (
      //   path && path.length ? dictionary[path] : dictionary
      // ) as T extends keyof Dictionary ? Dictionary[T] : Dictionary;

      const value = getDeepProp(dictionary, key);
      return (!value ? '' : value) as DotPathValue<Dictionary, L>;
    };

    return {
      locale: usedLocale,
      name: languages[usedLocale].name,
      engName: languages[usedLocale].engName,
      dir: languages[usedLocale].dir as Dir,
      l10n: dictionary,
      l6e,
    };
  }
);
