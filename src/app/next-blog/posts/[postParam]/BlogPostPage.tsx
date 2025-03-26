import {notFound} from 'next/navigation';

import {getBlogPost} from '@/helpers/next-blog/requests';

import type {AppPage, GetMetadata} from '@/types';
// import cls from './BlogPostPage.module.css';
import BlogPost from '@/components/next-blog/BlogPost';

export type BlogPostPg = AppPage<{postParam: string}>;
export type BlogPostGenMetadata = GetMetadata<{postParam: string}>;

export const generateMetadata: BlogPostGenMetadata = async ({params}) => {
  const {postParam} = await params;
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

const BlogPostPage: BlogPostPg = async ({params}) => {
  const {postParam} = await params;
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
