import {Locale} from '@/l10n/l10n.types';
import links from './links';
import site from './site';
import nav from './nav';
import articles from './articles';
import home from './home';
import contact from './contact';

export const nextBlog = (locale: Locale, options?: Record<string, any>) => ({
  site: site(locale, options),
  nav: nav(locale, options),
  links: links(locale, options),
  articles: articles(locale, options),
  home: home(locale, options),
  contact: contact(locale, options),
});
