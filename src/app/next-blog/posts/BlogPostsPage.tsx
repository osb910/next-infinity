import {type Metadata} from 'next';
import type {AppPage, JsonRes} from '@/types';
import {getBlogPostList} from '@/helpers/next-blog/blog-helpers';
import BlogPostCard from '@/components/next-blog/BlogPostCard';
import cls from './BlogPostsPage.module.css';

export const metadata: Metadata = {
  title: 'Blog Posts',
  description: 'Browse all blog posts',
};

const BlogPostsPage: AppPage<{}> = async ({}) => {
  const posts = await getBlogPostList();
  return (
    <>
      <ul>
        {posts.map(({slug, ...delegated}) => (
          <li key={slug}>
            <BlogPostCard slug={slug} {...delegated} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default BlogPostsPage;
