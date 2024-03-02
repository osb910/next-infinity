import Link from 'next/link';
import Image from 'next/image';
// import {format} from 'date-fns';

import Card from '@/ui/Card';

import {type CSSProperties} from 'react';
import cls from './BlogPostCard.module.css';

export interface BlogPostCardProps {
  slug: string;
  title: string;
  publishedOn: string;
  abstract: string;
  img?: string;
}

const BlogPostCard = ({
  slug,
  title,
  publishedOn,
  abstract,
  img,
}: BlogPostCardProps) => {
  const href = `/next-blog/posts/${slug}`;
  // const humanizedDate = format(new Date(publishedOn), 'MMMM do, yyyy');
  const formattedDate = new Date(publishedOn).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
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
            width={450}
            height={300}
          />
        </figure>
      )}
      <Link href={href} className={cls.title}>
        <h3>{title}</h3>
      </Link>
      <time dateTime={new Date(publishedOn).toISOString()}>
        {formattedDate}
      </time>
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
