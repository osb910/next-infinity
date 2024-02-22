import {format} from 'date-fns';
import clsx from 'clsx';

import cls from './BlogHero.module.css';
import {ComponentProps, ReactNode} from 'react';

const loadingStyle = {fontFamily: 'var(--fn-loading)'};
export interface BlogHeroProps extends ComponentProps<'header'> {
  title: string;
  publishedOn: string;
  children?: ReactNode;
}
const BlogHero = ({title, publishedOn, ...delegated}: BlogHeroProps) => {
  const humanizedDate = format(new Date(publishedOn), 'MMMM do, yyyy');

  return (
    <header className={clsx(cls.wrapper, delegated.className)} {...delegated}>
      <div className={cls.content}>
        <h1>{title}</h1>
        <p>
          Published on <time dateTime={publishedOn}>{humanizedDate}</time>
        </p>
      </div>
    </header>
  );
};

export const BlogHeroLoading = ({
  title,
  publishedOn,
  ...delegated
}: BlogHeroProps) => {
  const humanizedDate = format(new Date(publishedOn), 'MMMM do, yyyy');

  return (
    <header className={clsx(cls.wrapper, delegated.className)} {...delegated}>
      <div className={cls.content}>
        <h1 style={loadingStyle}>{title}</h1>
        <p>
          Published on{' '}
          <time style={loadingStyle} dateTime={publishedOn}>
            {humanizedDate}
          </time>
        </p>
      </div>
    </header>
  );
};

export default BlogHero;
