import Mdx from '@/ui/Mdx';
import BlogPostHero from '../BlogPostHero';
import Spinner from '@/ui/Spinner';
import COMPONENT_MAP from '@/helpers/next-blog/mdx-components';
import cls from './BlogPost.module.css';
import {getReadingTime} from '@/lib/text/analysis';

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

const BlogPost = ({data, slug}: BlogPostProps) => {
  const readingTime = getReadingTime(data.content).text;
  return (
    <article className={cls.post}>
      <BlogPostHero
        title={data.frontmatter.title}
        publishedOn={data.frontmatter.publishedOn}
        slug={slug}
        readingTime={readingTime}
      />
      <aside>{data.frontmatter.abstract}</aside>
      <section className={cls.content}>
        <main className={cls.body}>
          <Mdx
            source={data.content}
            loader={<Spinner />}
            components={COMPONENT_MAP}
          />
        </main>
        {/* <section className={cls.share}>
          <div className={cls.shareLinks}>Share</div>
        </section> */}
      </section>
    </article>
  );
};

export default BlogPost;
