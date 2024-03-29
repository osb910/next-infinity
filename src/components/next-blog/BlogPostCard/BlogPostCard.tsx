import Link from 'next/link';
import Image from 'next/image';
// import {format} from 'date-fns';

import Card from '@/ui/Card';

import {type CSSProperties} from 'react';
import cls from './BlogPostCard.module.css';
import {getReadingTime} from '@/lib/text/analysis';
import DateTooltip from '../DateTooltip';
import Separator from '@/ui/Separator';

export interface BlogPostCardProps {
  slug: string;
  title: string;
  publishedOn: string;
  abstract: string;
  body: string;
  category?: string;
  img?: string;
}

const BlogPostCard = ({
  slug,
  title,
  publishedOn,
  abstract,
  body,
  category = 'Web',
  img,
}: BlogPostCardProps) => {
  const href = `/next-blog/posts/${slug}`;
  const readingTime = getReadingTime(body);
  const truncatedAbstract =
    abstract.split(/[- ]/).length <= 24
      ? abstract
      : `${abstract.split(/[ ]/).slice(0, 24).join(' ')}...`;
  const style: CSSProperties & {[x: string]: any} = {'--padding': '1em'};

  return (
    <Card className={cls.wrapper} style={style}>
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
      <Link href={href} className={cls.title}>
        <h3>{title}</h3>
      </Link>
      <section className={cls.meta}>
        <p>{category}</p>
        <Separator color='var(--blog-decorative-800)' />
        <p>{readingTime.text}</p>
        <Separator color='var(--blog-decorative-800)' />
        <DateTooltip date={publishedOn} />
      </section>
      <p>
        {truncatedAbstract}{' '}
        <Link href={href} className={cls.readMoreLink}>
          Read more&nbsp;<span className={cls.arrow}>→</span>
        </Link>
      </p>
    </Card>
  );
};

export default BlogPostCard;
