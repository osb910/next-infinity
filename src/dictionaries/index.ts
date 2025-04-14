import {type Locale} from '@/l10n/l10n.types';

import {nextBlog} from './next-blog';
import auth from './auth';
import {nextInfinity} from './next-infinity';

const THE_DICTIONARY = (locale: Locale, options?: Record<string, unknown>) => {
  const dictionary = {
    nextInfinity: nextInfinity(locale, options),
    nextBlog: nextBlog(locale, options),
    auth: auth(locale, options),
  };
  return dictionary;
};

export default THE_DICTIONARY;
