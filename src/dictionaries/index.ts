import {type Locale} from '@/l10n/l10n.types';

import {nextBlog} from './next-blog';
import auth from './auth';

const THE_DICTIONARY = (locale: Locale, options?: Record<string, unknown>) => {
  const dictionary = {
    nextBlog: nextBlog(locale, options),
    auth: auth(locale, options),
  };
  return dictionary;
};

export default THE_DICTIONARY;
