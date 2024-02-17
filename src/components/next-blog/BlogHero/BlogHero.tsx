import {format} from 'date-fns';
import clsx from 'clsx';

import styles from './BlogHero.module.css';
import {ComponentProps, ReactNode} from 'react';

export interface BlogHeroProps extends ComponentProps<'header'> {
  title: string;
  publishedOn: string;
  children?: ReactNode;
}
function BlogHero({title, publishedOn, ...delegated}: BlogHeroProps) {
  const humanizedDate = format(new Date(publishedOn), 'MMMM do, yyyy');

  return (
    <header
      className={clsx(styles.wrapper, delegated.className)}
      {...delegated}
    >
      <div className={styles.content}>
        <h1>{title}</h1>
        <p>
          Published on <time dateTime={publishedOn}>{humanizedDate}</time>
        </p>
      </div>
    </header>
  );
}

export default BlogHero;
