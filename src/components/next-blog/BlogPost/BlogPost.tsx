import {getReadingTime} from '@/lib/text/analysis';
import COMPONENT_MAP from '@/helpers/next-blog/mdx-components';
import {FaTelegram, FaWhatsapp} from 'react-icons/fa';
import BlogPostHero from '../BlogPostHero';
import Mdx from '@/ui/Mdx/remote-client';
import Icon from '@/ui/Icon/lucide';
import Spinner from '@/ui/Spinner';
import cls from './BlogPost.module.css';
import Link from 'next/link';
import {
  getFacebookShareLink,
  getLinkedInShareLink,
  getTelegramShareLink,
  getTwitterShareLink,
  getWhatsappShareLink,
} from '@/utils/general';
import {env} from '@/lib/helpers';
import {localize} from '@/l10n';
import {getLocale} from '@/l10n/getL10n';
import clsx from 'clsx';
import {AR_REGEX} from '@/lib/text/regex/ar-regex';

interface BlogPostProps {
  data: {
    frontmatter: {
      [x: string]: string;
    };
    content: string;
  };
  slug: string;
}

const BlogPost = async ({data, slug}: BlogPostProps) => {
  const locale = await getLocale();
  const {l6e} = await localize(locale);
  const readingTime = getReadingTime(data.content, {locale}).text;
  const shareUrl = `${env('ORIGIN')}/next-blog/posts/${slug}`;
  return (
    <article className={cls.post}>
      <BlogPostHero
        title={data.frontmatter.title}
        publishedOn={data.frontmatter.publishedOn}
        slug={slug}
        readingTime={readingTime}
        category={l6e('nextBlog.articles.defaultCategory')}
        locale={locale}
      />
      <aside
        className={clsx(
          cls.abstract,
          AR_REGEX.anyChar.test(data.frontmatter.abstract) ? 'rtl' : 'ltr'
        )}
        dir='auto'
      >
        {data.frontmatter.abstract}
      </aside>
      <section className={cls.content}>
        <main
          className={clsx(
            cls.body,
            AR_REGEX.anyChar.test(data.content) ? 'rtl' : 'ltr'
          )}
          dir='auto'
        >
          <Mdx
            source={data.content}
            loader={<Spinner />}
            components={COMPONENT_MAP}
          />
        </main>
        <aside className={cls.share}>
          <section className={cls.shareLinks}>
            <Link
              target='_blank'
              href={getTwitterShareLink(shareUrl, {source: 'next-blog'})}
            >
              <Icon name='twitter' />
            </Link>
            <Link
              target='_blank'
              href={getFacebookShareLink(shareUrl, {source: 'next-blog'})}
            >
              <Icon name='facebook' />
            </Link>
            <Link
              target='_blank'
              href={getLinkedInShareLink(shareUrl, {source: 'next-blog'})}
            >
              <Icon name='linkedin' />
            </Link>
            <Link
              target='_blank'
              href={getTelegramShareLink(shareUrl, {source: 'next-blog'})}
            >
              <FaTelegram />
            </Link>
            <Link
              target='_blank'
              href={getWhatsappShareLink(shareUrl, {source: 'next-blog'})}
            >
              <FaWhatsapp />
            </Link>
          </section>
        </aside>
      </section>
    </article>
  );
};

export default BlogPost;
