import {format} from 'date-fns';
import clsx from 'clsx';
import {type ComponentProps, type ReactNode} from 'react';
import cls from './BlogPostHero.module.css';
import Image from 'next/image';
import DateTooltip from '../DateTooltip';
import Separator from '@/ui/Separator';

const loadingStyle = {fontFamily: 'var(--fn-loading)'};

export interface BlogPostHeroProps extends ComponentProps<'header'> {
  title: string;
  slug: string;
  publishedOn: string;
  children?: ReactNode;
  category?: string;
  readingTime: string;
  img?: string;
  locale?: 'en';
}
const BlogPostHero = ({
  title,
  slug,
  category = 'Web',
  readingTime,
  publishedOn,
  children,
  img,
  ...delegated
}: BlogPostHeroProps) => {
  // const humanizedDate = format(new Date(publishedOn), 'MMMM do, yyyy');

  return (
    <header className={clsx(cls.hero, delegated.className)} {...delegated}>
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
        <DateTooltip date={publishedOn} />
      </section>
      {children}
    </header>
  );
};

export const BlogPostHeroLoading = ({
  title,
  publishedOn,
  slug,
  category = 'Web',
  readingTime,
  img,
  ...delegated
}: BlogPostHeroProps) => {
  const humanizedDate = format(new Date(publishedOn), 'MMMM do, yyyy');

  return (
    <header
      className={clsx(cls.hero, delegated.className)}
      {...delegated}
      dir='auto'
    >
      <h1 style={loadingStyle}>{title}</h1>
      <section className={cls.meta} style={loadingStyle}>
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
