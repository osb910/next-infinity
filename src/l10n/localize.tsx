import {cache} from 'react';
import THE_DICTIONARY from '@/dictionaries';
import {hasMdx} from '@/lib/text/regex';
import {getDeepProp} from '@/utils/general';
import Mdx from '@/ui/Mdx/remote-client';
import {defaultLocale, languages} from './config';
import type {Dictionary, L6eComponent, L6eFn, Locale} from './l10n.types';
import type {Dir, DotPathValue} from '@/types';

export const localize = cache(
  async <T extends keyof Dictionary | '' | undefined>({
    locale,
    path = '',
  }: {
    locale?: Locale;
    path?: T;
  } = {}) => {
    const usedLocale = locale ?? defaultLocale;
    const dictionary = THE_DICTIONARY(usedLocale);
    const language = languages[usedLocale];

    // if (path) {
    //   const deepDictionary = dictionary[path] as Dictionary[T];
    // }

    const l6e: L6eFn = (key) => {
      // const deepDictionary = (
      //   path && path.length ? dictionary[path] : dictionary
      // ) as T extends keyof Dictionary ? Dictionary[T] : Dictionary;

      const value = (getDeepProp(dictionary, key) ?? '') as DotPathValue<
        Dictionary,
        typeof key
      >;

      let text;
      if (typeof value === 'string' && /ar(-[A-Z]{2})?/.test(usedLocale)) {
        text = value.replace(/\d+/g, (m) =>
          (+m).toLocaleString('ar-EG', {
            useGrouping: false,
          })
        );
      } else {
        text = value;
      }
      return text as DotPathValue<Dictionary, typeof key>;
    };

    const L6e: L6eComponent = ({k, forceMdx = false}) => {
      const value = (getDeepProp(dictionary, k) ?? '') as DotPathValue<
        Dictionary,
        typeof k
      >;

      if (typeof value !== 'string') return;

      const text = /ar(-[A-Z]{2})?/.test(usedLocale)
        ? value
            .replace(/\d+/g, (m) =>
              (+m).toLocaleString('ar-EG', {
                useGrouping: false,
              })
            )
            .trim()
        : value.trim();

      const renderMdx = forceMdx || hasMdx(value);
      return renderMdx ? <Mdx source={text.trim()} /> : <>{value}</>;
    };

    return {
      locale: usedLocale,
      name: language.name,
      engName: language.engName,
      dir: language.dir as Dir,
      l10n: dictionary,
      l6e,
      L6e,
    };
  }
);
