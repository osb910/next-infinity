import BlogHero from '@/components/next-blog/BlogHero';
import {type Metadata} from 'next';
import type {AppPage, JsonRes} from '@/types';
import styles from './BlogPostPage.module.css';
import {readFolder} from '@/utils/file';
import {loadBlogPost} from '@/helpers/blog-helpers';
import PrettyDump from '@/ui/PrettyDump';

export const metadata: Metadata = {
  title: 'BlogPostPage',
};

export type BlogPostPg = AppPage<{postParam: string}>;

const BlogPostPage: BlogPostPg = async ({params: {postParam}}) => {
  const post = await loadBlogPost('css-font-size');
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
      <PrettyDump data={await readFolder('src')} />
      <PrettyDump data={post.frontmatter} />
      <p>{post.content}</p>
    </>
  );
};

export default BlogPostPage;
