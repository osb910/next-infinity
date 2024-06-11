import {notFound} from 'next/navigation';

import {getBlogPost} from '@/helpers/next-blog/requests';

import type {AppPage, GetMetadata} from '@/types';
import cls from './BlogPostPage.module.css';
import BlogPost from '@/components/next-blog/BlogPost';

export type BlogPostPg = AppPage<{postParam: string}>;

export const generateMetadata: GetMetadata<BlogPostPg> = async ({
  params: {postParam},
}) => {
  const {data} = await getBlogPost(postParam);
  return data
    ? {
        title: data.frontmatter.title,
        description: data.frontmatter.abstract,
      }
    : {
        title: 'Post Not Found',
      };
};

const BlogPostPage: BlogPostPg = async ({params: {postParam}}) => {
  try {
    const {data} = await getBlogPost(postParam);
    if (!data) notFound();
    return (
      <BlogPost
        data={data}
        slug={postParam}
      />
    );
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default BlogPostPage;
