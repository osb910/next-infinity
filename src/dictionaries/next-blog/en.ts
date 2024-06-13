const dictionary = {
  site: {
    title: 'Next Blog',
    description:
      'Read about different topics, mainly web development, translation, and the Arabic language.',
  },
  nav: {},
  links: {
    twitter: 'https://www.x.com/omarshdev',
    github: 'https://www.github.com/osb910',
    linkedin: 'https://linkedin.com/in/osbdev',
    discord: 'http://discordapp.com/users/249233571024207872',
  },
};

export default dictionary as {
  [k in keyof typeof dictionary]: (typeof dictionary)[k];
};
