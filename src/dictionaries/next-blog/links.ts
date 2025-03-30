import {Locale} from '@/l10n/l10n.types';

const links = (locale: Locale, options?: Record<string, any>) => {
  const dict = {
    ar: {
      twitter: 'https://www.x.com/omarshdev',
      github: 'https://www.github.com/osb910',
      linkedin: 'https://linkedin.com/in/osbdev',
      discord: 'http://discordapp.com/users/249233571024207872',
    },
    en: {
      twitter: 'https://www.x.com/omarshdev',
      github: 'https://www.github.com/osb910',
      linkedin: 'https://linkedin.com/in/osbdev',
      discord: 'http://discordapp.com/users/249233571024207872',
    },
  };
  return dict[locale];
};

export default links;
