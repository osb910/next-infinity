import {getReadingTime} from '@/lib/text/analysis';
import COMPONENT_MAP from '@/helpers/next-blog/mdx-components';
import BlogPostHero from '../BlogPostHero';
import Mdx from '@/ui/Mdx';
import Icon from '@/ui/Icon/lucide';
import Spinner from '@/ui/Spinner';
import {FaTelegram, FaWhatsapp} from 'react-icons/fa';
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

interface BlogPostProps {
  data: {
    frontmatter: {
      title: string;
      publishedOn: string;
      abstract: string;
    };
    content: string;
  };
  slug: string;
}

const BlogPost = async ({data, slug}: BlogPostProps) => {
  const readingTime = getReadingTime(data.content).text;
  const shareUrl = `${env('ORIGIN')}/next-blog/posts/${slug}`;
  return (
    <article className={cls.post}>
      <BlogPostHero
        title={data.frontmatter.title}
        publishedOn={data.frontmatter.publishedOn}
        slug={slug}
        readingTime={readingTime}
      />
      <aside className={cls.abstract}>{data.frontmatter.abstract}</aside>
      <section className={cls.content}>
        <main className={cls.body}>
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
