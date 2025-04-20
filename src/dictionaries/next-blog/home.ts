import type {Locale} from '@/l10n/l10n.types';

const home = (locale: Locale, options?: Record<string, string>) => {
  const pageType = options?.pageType ?? (locale === 'ar' ? 'الصفحة' : 'Page');
  const path = options?.path ?? '';
  const dict = {
    ar: {
      latest: 'جديد المدونة',
      hero: {
        hi: `مرحبًا، أنا عمر`,
        about: 'أكتب في برمجة المواقع والترجمة واللغة العربية. 💻🌐🖊️📗',
      },
      omarPicAlt: 'صورة لعمر',
      notFound: {
        title: `${pageType} غير موجودة`,
        description: `ذهب الخادوم يبحث عن ${pageType} في ${path} ورجع بخُفَّي حُنين.`,
        goHome: 'ارجع إلى المدخل',
      },
    },
    en: {
      latest: 'Latest content',
      hero: {
        hi: `Hi, I'm Omar`,
        about:
          'I write about web development, translation and Arabic language. 💻🌐🖊️📗',
      },
      omarPicAlt: 'A picture sowing Omar.',
      notFound: {
        title: `${pageType} not found`,
        description: `The ${pageType.toLowerCase()} you are looking for at ${path} does not exist.`,
        goHome: 'Go back home',
      },
    },
  };
  return dict[locale];
};

export default home;
