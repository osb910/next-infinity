import {Locale} from '@/l10n/next-blog/l10n.types';
import links from './links';

export const nextBlog = (locale: Locale) => ({
  links: links(locale),
});
