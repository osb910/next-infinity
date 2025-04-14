import Link from 'next/link';
import Image from 'next/image';

import Card from '@/ui/Card';

import cls from './BlogPostCard.module.css';
import {getReadingTime} from '@/lib/text/analysis';
import DateTooltip from '../DateTooltip';
import Separator from '@/ui/Separator';
import {getLocale} from '@/l10n/getL10n';
import {CSSProps} from '@/types';
import {localize} from '@/l10n';
import {AR_REGEX} from '@/lib/text/regex/ar-regex';

export interface BlogPostCardProps {
  slug: string;
  title: string;
  publishedOn: string;
  abstract: string;
  body: string;
  category?: string;
  img?: string;
}

const BlogPostCard = async ({
  slug,
  title,
  publishedOn,
  abstract,
  body,
  category = 'Web',
  img,
}: BlogPostCardProps) => {
  const locale = await getLocale();
  const {l6e, dir} = await localize(locale);
  const href = `/next-blog/posts/${slug}`;
  const readingTime = getReadingTime(body, {locale});
  const truncatedAbstract =
    abstract.split(/[- ]/).length <= 24
      ? abstract
      : `${abstract.split(/[ ]/).slice(0, 24).join(' ')}...`;

  const style: CSSProps = {'--padding': '1em'};

  return (
    <Card
      className={cls.wrapper}
      style={style}
      dir='auto'
    >
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
      <Link
        href={href}
        className={cls.title}
      >
        <h3
          className={AR_REGEX.anyChar.test(title) ? 'rtl' : 'ltr'}
          dir='auto'
        >
          {title}
        </h3>
      </Link>
      <section
        className={cls.meta}
        dir={dir}
      >
        <p>{l6e('nextBlog.articles.categories.web') ?? category}</p>
        <Separator color='var(--blog-decorative-800)' />
        <p>{readingTime.text}</p>
        <Separator color='var(--blog-decorative-800)' />
        <DateTooltip
          date={publishedOn}
          locale={locale}
        />
      </section>
      <p dir={dir}>
        <span
          className={AR_REGEX.anyChar.test(truncatedAbstract) ? 'rtl' : 'ltr'}
          dir='auto'
        >
          {truncatedAbstract}
        </span>{' '}
        <Link
          href={href}
          className={cls.readMoreLink}
        >
          {l6e('nextBlog.articles.readMore')}&nbsp;
          <span className={cls.arrow}>{dir === 'rtl' ? '←' : '→'}</span>
        </Link>
      </p>
    </Card>
  );
};

export default BlogPostCard;
