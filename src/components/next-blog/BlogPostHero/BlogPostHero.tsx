import {format} from 'date-fns';
import clsx from 'clsx';
import {type ComponentProps, type ReactNode} from 'react';
import cls from './BlogPostHero.module.css';

const loadingStyle = {fontFamily: 'var(--fn-loading)'};

export interface BlogPostHeroProps extends ComponentProps<'header'> {
  title: string;
  publishedOn: string;
  children?: ReactNode;
  locale?: 'en';
}
const BlogPostHero = ({
  title,
  publishedOn,
  children,
  ...delegated
}: BlogPostHeroProps) => {
  const humanizedDate = format(new Date(publishedOn), 'MMMM do, yyyy');

  return (
    <header className={clsx(cls.hero, delegated.className)} {...delegated}>
      <h1>{title}</h1>
      <p>
        Published on <time dateTime={publishedOn}>{humanizedDate}</time>
      </p>
      {children}
    </header>
  );
};

export const BlogPostHeroLoading = ({
  title,
  publishedOn,
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
      <p>
        Published on{' '}
        <time style={loadingStyle} dateTime={publishedOn}>
          {humanizedDate}
        </time>
      </p>
    </header>
  );
};

export default BlogPostHero;
