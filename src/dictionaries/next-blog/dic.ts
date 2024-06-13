import {type Locale} from '@/l10n/next-blog/l10n.types';

import ar from './ar';
import en from './en';

const THE_DICTIONARY = (locale: Locale) => {
  const dictionary = {ar, en};
  return dictionary[locale];
};

export default THE_DICTIONARY;
