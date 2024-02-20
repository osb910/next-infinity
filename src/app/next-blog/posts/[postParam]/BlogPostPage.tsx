import {cache} from 'react';
import dynamic from 'next/dynamic';
import {loadBlogPost} from '@/helpers/next-blog/blog-helpers';
import BlogHero from '@/components/next-blog/BlogHero';
import Mdx from '@/ui/Mdx';
import {Spinner} from '@/ui/Spinner';
import type {AppPage, GetMetadata, JsonRes} from '@/types';
import cls from './BlogPostPage.module.css';
import Codum from '@/ui/Codum';
const DivisionGroupsDemo = dynamic(
  () => import('@/components/next-blog/DivisionGroupsDemo'),
  {loading: () => <Spinner />, ssr: false}
);
const CircularColorsDemo = dynamic(
  () => import('@/components/next-blog/CircularColorsDemo'),
  {loading: () => <Spinner />, ssr: false}
);

const fetcher = cache(async (postParam: string) => {
  const posts = await loadBlogPost(postParam);
  return posts;
});

export type BlogPostPg = AppPage<{postParam: string}>;

export const generateMetadata: GetMetadata<BlogPostPg> = async ({
  params: {postParam},
}) => {
  const {frontmatter} = await fetcher(postParam);
  return {
    title: frontmatter.title,
    description: frontmatter.abstract,
  };
};

const BlogPostPage: BlogPostPg = async ({params: {postParam}}) => {
  try {
    const {frontmatter, content} = await fetcher(postParam);
    return (
      <>
        <article className={cls.wrapper}>
          <BlogHero
            title={frontmatter.title}
            publishedOn={frontmatter.publishedOn}
          />
          <div className={cls.page}>
            <Mdx
              source={content}
              loader={<Spinner />}
              components={{Code: Codum, DivisionGroupsDemo, CircularColorsDemo}}
            />
          </div>
        </article>
      </>
    );
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default BlogPostPage;
