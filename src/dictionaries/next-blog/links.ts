import {Locale} from '@/l10n/l10n.types';

const links = (locale: Locale, options?: Record<string, any>) => {
  const dict = {
    ar: {
      twitterLabel: 'إكس',
      twitter: 'https://www.x.com/omarshdev',
      githubLabel: 'جِتهَب',
      github: 'https://www.github.com/osb910',
      linkedinLabel: 'لِنكدن',
      linkedin: 'https://linkedin.com/in/osbdev',
      discordLabel: 'دِسكُرد',
      discord: 'http://discordapp.com/users/249233571024207872',
      rssLabel: 'آر إس إس',
      rss: '/api/next-blog/rss',
    },
    en: {
      twitterLabel: 'X',
      twitter: 'https://www.x.com/omarshdev',
      githubLabel: 'GitHub',
      github: 'https://www.github.com/osb910',
      linkedinLabel: 'LinkedIn',
      linkedin: 'https://linkedin.com/in/osbdev',
      discordLabel: 'Discord',
      discord: 'http://discordapp.com/users/249233571024207872',
      rssLabel: 'RSS',
      rss: '/api/next-blog/rss',
    },
  };
  return dict[locale];
};

export default links;
