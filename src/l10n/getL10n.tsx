import Negotiator from 'negotiator';
import {cookies} from 'next/headers';
import {cache} from 'react';
import {match} from '@formatjs/intl-localematcher';
import {defaultLocale, locales} from './config';
import {type NextRequest} from 'next/server';
import type {Locale} from './l10n.types';

export const readLocale = (req: NextRequest) => {
  const languages = new Negotiator({
    headers: Object.fromEntries(req.headers.entries()),
  }).languages();

  return match(languages, locales, defaultLocale);
};

export const getLocale = cache(async () => {
  const value = (await cookies()).get('locale')?.value;
  const locale = (value ?? defaultLocale) as Locale;
  return locale;
});
