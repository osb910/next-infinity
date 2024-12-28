import {Locale} from '@/l10n/l10n.types';
import links from './links';
import site from './site';
import nav from './nav';
import articles from './articles';

export const nextBlog = (locale: Locale) => ({
  site: site(locale),
  nav: nav(locale),
  links: links(locale),
  articles: articles(locale),
});
