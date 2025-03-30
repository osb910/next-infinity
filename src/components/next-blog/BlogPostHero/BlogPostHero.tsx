import clsx from 'clsx';
import {type ComponentProps, type ReactNode} from 'react';
import cls from './BlogPostHero.module.css';
import Image from 'next/image';
import DateTooltip from '../DateTooltip';
import Separator from '@/ui/Separator';
import {type Locale} from '@/l10n';

const loadingStyle = {fontFamily: 'var(--fn-loading)'};

export interface BlogPostHeroProps extends ComponentProps<'header'> {
  title: string;
  slug: string;
  publishedOn: string;
  children?: ReactNode;
  category?: string;
  readingTime: string;
  img?: string;
  locale?: Locale;
}
const BlogPostHero = ({
  title,
  slug,
  category = 'Web',
  readingTime,
  publishedOn,
  children,
  img,
  locale,
  ...rest
}: BlogPostHeroProps) => {
  return (
    <header
      className={clsx(cls.hero, rest.className)}
      dir='auto'
      {...rest}
    >
      <h1>{title}</h1>
      {img && (
        <figure className={cls.image}>
          <Image
            src={`/api/next-blog/files/${slug}/${img}`}
            alt={title}
            width={600}
            height={300}
          />
        </figure>
      )}
      <section className={cls.meta}>
        <p>{category}</p>
        <Separator color='var(--blog-decorative-800)' />
        <p>{readingTime}</p>
        <Separator color='var(--blog-decorative-800)' />
        <DateTooltip
          date={publishedOn}
          locale={locale}
        />
      </section>
      {children}
    </header>
  );
};

export const BlogPostHeroLoading = ({
  title,
  publishedOn,
  category = 'Web',
  readingTime,
  ...rest
}: BlogPostHeroProps) => {
  return (
    <header
      className={clsx(cls.hero, rest.className)}
      {...rest}
      dir='auto'
    >
      <h1 style={loadingStyle}>{title}</h1>
      <section
        className={cls.meta}
        style={loadingStyle}
      >
        <p>{category}</p>
        <Separator color='var(--blog-decorative-600)' />
        <p>{readingTime}</p>
        <Separator color='var(--blog-decorative-600)' />
        <DateTooltip date={publishedOn} />
      </section>
    </header>
  );
};

export default BlogPostHero;
