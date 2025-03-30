import type {Locale} from '@/l10n/l10n.types';

const home = (locale: Locale, options?: Record<string, any>) => {
  const dict = {
    ar: {
      latest: 'جديد المدونة',
      hero: {
        hi: `سلام، أنا عمر`,
        about: 'أكتب في برمجة المواقع والترجمة واللغة العربية. 💻🌐🖊️📗',
      },
      omarPicAlt: 'صورة لعمر',
    },
    en: {
      latest: 'Latest content',
      hero: {
        hi: `Hi, I'm Omar`,
        about:
          'I write about web development, translation and Arabic language. 💻🌐🖊️📗',
      },
      omarPicAlt: 'A picture sowing Omar.',
    },
  };
  return dict[locale];
};

export default home;
