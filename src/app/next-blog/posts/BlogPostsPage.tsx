import {type Metadata} from 'next';
import type {AppPage, JsonRes} from '@/types';
import {getBlogPostList} from '@/helpers/next-blog/blog-helpers';
import BlogPostCard from '@/components/next-blog/BlogPostCard';
import cls from './BlogPostsPage.module.css';

export const metadata: Metadata = {
  title: 'BlogPostsPage',
};

const BlogPostsPage: AppPage<{}> = async ({}) => {
  const posts = await getBlogPostList();
  return (
    <>
      <ul>
        {posts.map(({slug, title, abstract, publishedOn}) => (
          <li key={slug}>
            <BlogPostCard
              abstract={abstract}
              slug={slug}
              title={title}
              publishedOn={publishedOn}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default BlogPostsPage;
