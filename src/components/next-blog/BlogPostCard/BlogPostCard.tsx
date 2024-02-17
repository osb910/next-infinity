import Link from 'next/link';
import {format} from 'date-fns';

import Card from '@/ui/Card';

import styles from './BlogPostCard.module.css';

export interface BlogPostCardProps {
  slug: string;
  title: string;
  publishedOn: Date;
  abstract: string;
}

const BlogPostCard = ({
  slug,
  title,
  publishedOn,
  abstract,
}: BlogPostCardProps) => {
  const href = `/next-blog/${slug}`;
  const humanizedDate = format(new Date(publishedOn), 'MMMM do, yyyy');

  return (
    <Card className={styles.wrapper}>
      <Link href={href} className={styles.title}>
        {title}
      </Link>
      <time dateTime={publishedOn.toISOString()}>{humanizedDate}</time>
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
