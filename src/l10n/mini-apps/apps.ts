const appsInfo = {
  en: {
    // siteName: 'Next Blog',
    // description:
    //   'Read about different topics, mainly web development, translation, and the Arabic language.',
    links: {
      twitter: 'https://www.x.com/omarshdev',
      github: 'https://www.github.com/osb910',
      linkedin: 'https://linkedin.com/in/osbdev',
      discord: 'http://discordapp.com/users/249233571024207872',
    },
  },
  ar: {
    // siteName: 'مدونة نِكست',
    // description:
    //   'ديواني في ميادينَ شتى، غالبًا في برمجة الوِب والترجمة واللغة العربية.',
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
