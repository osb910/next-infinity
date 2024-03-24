const siteInfo = {
  en: {
    siteName: 'Next Blog',
    description:
      'Read about different topics, mainly web development, translation, and the Arabic language.',
    links: {
      twitter: 'https://www.x.com/omarshdev',
      github: 'https://www.github.com/osb910',
      linkedin: 'https://linkedin.com/omarshdev',
      discord: 'XXXXXXXXXXXXXXXXXXXXXXX',
    },
  },
  ar: {
    siteName: 'مدونة نِكست',
    description:
      'ديواني في ميادينَ شتى، غالبًا في برمجة الوِب والترجمة واللغة العربية.',
    links: {
      twitter: 'https://www.x.com/omarshdev',
      github: 'https://www.github.com/osb910',
      linkedin: 'https://linkedin.com/omarshdev',
      discord: 'XXXXXXXXXXXXXXXXXXXXXXX',
    },
  },
};

export default siteInfo;

export type SiteInfo = keyof typeof siteInfo;
