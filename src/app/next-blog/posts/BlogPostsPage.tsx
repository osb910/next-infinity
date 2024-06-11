import {type Metadata} from 'next';
import type {AppPage} from '@/types';
import {getBlogPostList} from '@/helpers/next-blog/blog-helpers';
import BlogPostCard from '@/components/next-blog/BlogPostCard';
import BlogPosts from '@/components/next-blog/BlogPosts';
import cls from './BlogPostsPage.module.css';
import {pluralize} from '@/utils/numbers';

export const metadata: Metadata = {
  title: 'Blog Posts',
  description: 'Browse all blog posts',
};

const BlogPostsPage: AppPage<{}> = async ({}) => {
  try {
    const posts = await getBlogPostList();
    return (
      <>
        <section className={cls.title}>
          <h2>All Posts</h2>
          <p>{pluralize('post', posts.length)}</p>
        </section>
        <BlogPosts posts={posts} />
      </>
    );
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default BlogPostsPage;
