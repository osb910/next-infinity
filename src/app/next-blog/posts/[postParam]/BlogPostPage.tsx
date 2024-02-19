import BlogHero from '@/components/next-blog/BlogHero';
import {type Metadata} from 'next';
import type {AppPage, JsonRes} from '@/types';
import styles from './BlogPostPage.module.css';
import {readDir, readFile} from '@/utils/file';
import {getBlogPostList} from '@/helpers/next-blog/blog-helpers';
import PrettyDump from '@/ui/PrettyDump';

export const metadata: Metadata = {
  title: 'BlogPostPage',
};

export type BlogPostPg = AppPage<{postParam: string}>;

const BlogPostPage: BlogPostPg = async ({params: {postParam}}) => {
  const posts = await getBlogPostList();
  return (
    <>
      <article className={styles.wrapper}>
        <BlogHero
          title='Example post!'
          publishedOn={new Date().toISOString()}
        />
        <div className={styles.page}>
          <p>This is where the blog post will go!</p>
          <p>
            You will need to use <em>MDX</em> to render all of the elements
            created from the blog post in this spot.
          </p>
        </div>
      </article>
      <PrettyDump data={await readDir('src/data/next-blog')} />
      {posts.map((post: any, idx) => (
        <div key={idx}>
          <p>{post.slug}</p>
          <p>{post.title}</p>
          <p>{post.publishedOn}</p>
          <p>{post.abstract}</p>
          <br />
        </div>
      ))}
      {/* <PrettyDump data={post.frontmatter} /> */}
    </>
  );
};

export default BlogPostPage;
