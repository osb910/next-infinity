import {type Locale} from '@/l10n/next-blog/l10n.types';

import {nextBlog} from './next-blog/dic';

const THE_DICTIONARY = (locale: Locale) => {
  const dictionary = {
    nextBlog: nextBlog(locale),
  };
  return dictionary;
};

export default THE_DICTIONARY;
