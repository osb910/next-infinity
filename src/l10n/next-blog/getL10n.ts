import Negotiator from 'negotiator';
import {cache} from 'react';
import {match} from '@formatjs/intl-localematcher';
import {defaultLocale, languages, locales} from './config';
import {getDeepProp} from '@/utils/general';
import {type NextRequest} from 'next/server';
import type {Dictionary, DottedL10n, Locale} from './l10n.types';
import type {Dir, DotPathValue} from '@/types';

export const getLocale = (req: NextRequest) => {
  const languages = new Negotiator({
    headers: Object.fromEntries(req.headers.entries()),
  }).languages();

  return match(languages, locales, defaultLocale);
};

export const localize = cache(
  async <T extends DottedL10n>({locale, path}: {locale?: Locale; path?: T}) => {
    const usedLocale = locale ?? defaultLocale;

    let dictionary = await languages[usedLocale].dictionary();

    // if (path) {
    //   dictionary = getDeepProp(dictionary, path) as DotPathValue<Dictionary, T>;
    // }

    const l6e = <
      L extends DottedL10n
      // DottedPaths<DotPathValue<Dictionary, T>>
    >(
      key: L
    ) => {
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
