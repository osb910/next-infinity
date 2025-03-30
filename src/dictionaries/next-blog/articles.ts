import type {Locale} from '@/l10n/l10n.types';

const articles = (locale: Locale, options?: Record<string, any>) => {
  const dict = {
    ar: {
      defaultCategory: 'الإنترنت',
      categories: {
        web: 'الإنترنت',
      },
      title: 'المقالات',
      description: 'تصفح المقالات كلها',
      allPosts: 'كل المقالات',
      readMore: 'اقرأ المزيد',
    },
    en: {
      defaultCategory: 'Web',
      categories: {
        web: 'Web',
      },
      title: 'Blog Posts',
      description: 'Browse all blog posts',
      allPosts: 'All Posts',
      readMore: 'Read More',
    },
  };
  return dict[locale];
};

export default articles;
