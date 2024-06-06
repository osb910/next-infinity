const appsInfo = {
  en: {
    links: {
      twitter: 'https://www.x.com/omarshdev',
      github: 'https://www.github.com/osb910',
      linkedin: 'https://linkedin.com/in/osbdev',
      discord: 'http://discordapp.com/users/249233571024207872',
    },
  },
  ar: {
    links: {
      twitter: 'https://www.x.com/omarshdev',
      github: 'https://www.github.com/osb910',
      linkedin: 'https://linkedin.com/in/osbdev',
      discord: 'http://discordapp.com/users/249233571024207872',
    },
  },
};

export default appsInfo;

export type AppsInfo = keyof typeof appsInfo;
