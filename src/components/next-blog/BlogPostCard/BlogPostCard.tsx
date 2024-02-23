import Link from 'next/link';
import {format} from 'date-fns';

import Card from '@/ui/Card';

import styles from './BlogPostCard.module.css';
import {CSSProperties} from 'react';

export interface BlogPostCardProps {
  slug: string;
  title: string;
  publishedOn: string;
  abstract: string;
}

const BlogPostCard = ({
  slug,
  title,
  publishedOn,
  abstract,
}: BlogPostCardProps) => {
  const href = `/next-blog/posts/${slug}`;
  const humanizedDate = format(new Date(publishedOn), 'MMMM do, yyyy');
  const style: CSSProperties & {[x: string]: any} = {'--padding': '1.5em'};

  return (
    <Card className={styles.wrapper} style={style}>
      <Link href={href} className={styles.title}>
        {title}
      </Link>
      <time dateTime={new Date(publishedOn).toISOString()}>
        {humanizedDate}
      </time>
      <p>
        {abstract}{' '}
        <Link href={href} className={styles.continueReadingLink}>
          Continue reading <span className={styles.arrow}>→</span>
        </Link>
      </p>
    </Card>
  );
};

export default BlogPostCard;
