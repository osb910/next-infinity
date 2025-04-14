import type {Locale} from '@/l10n/l10n.types';

const site = (locale: Locale, options?: Record<string, any>) => {
  const dict = {
    ar: {
      title: 'نِكست إنفِنِتي',
      description:
        'طائفة من المشروعات الفرعية والتطبيقات الصغيرة أُنشئت باستعمال نِكست، وتَيبسكربت، وفريمرموشن.',
      logo: 'شعار نِكست إنفِنِتي',
    },
    en: {
      title: 'Next Infinity',
      description:
        'An assortment of full-stack projects and miniature applications crafted using Next.js, TypeScript, MongoDB, and Framer Motion.',
      logo: 'Next Infinity logo',
    },
  };
  return dict[locale];
};

export default site;
