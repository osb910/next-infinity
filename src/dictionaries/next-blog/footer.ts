import type {Locale} from '@/l10n/l10n.types';

const footer = (locale: Locale, options?: Record<string, any>) => {
  const year = new Date().getFullYear();
  const dict = {
    ar: {
      blogCredit: `<>قام بإنشاء المدونة [عمر شريف](${options?.ghLink})</>`,
      blogTemplateCredit: `<>قالب المدونة من صنع [يوشع كوموه](https://www.joshwcomeau.com/). اطلع على [The Joy of React](https://www.joyofreact.com/) لتتعلم كيف تصنع تطبيقات رئكت دينامية مثل هذا!</>`,
      copyright: `© ${year} مدونة نِكست. جميع الحقوق محفوظة.`,
      links: 'الروابط',
    },
    en: {
      blogCredit: `<>Blog created with ❤️ by [Omar Shareef](${options?.ghLink})</>`,
      blogTemplateCredit: `<>Blog template created by [Josh W. Comeau](https://www.joshwcomeau.com/). Check out [The Joy of React](https://www.joyofreact.com/) to learn how to build dynamic React apps like this one!</>`,
      copyright: `© ${year} Next Blog. All rights reserved.`,
      links: 'Links',
    },
  };
  return dict[locale];
};

export default footer;
