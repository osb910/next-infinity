import dynamic from 'next/dynamic';

import {getBlogPost} from '@/helpers/next-blog/requests';
import BlogHero from '@/components/next-blog/BlogHero';
import Mdx from '@/ui/Mdx';
import Codum from '@/ui/Codum';
import {Spinner} from '@/ui/Spinner';

import type {AppPage, GetMetadata, JsonRes} from '@/types';
import cls from './BlogPostPage.module.css';

const DivisionGroupsDemo = dynamic(
  () => import('@/components/next-blog/DivisionGroupsDemo'),
  {loading: () => <Spinner />, ssr: false}
);
const CircularColorsDemo = dynamic(
  () => import('@/components/next-blog/CircularColorsDemo'),
  {loading: () => <Spinner />, ssr: false}
);

export type BlogPostPg = AppPage<{postParam: string}>;

export const generateMetadata: GetMetadata<BlogPostPg> = async ({
  params: {postParam},
}) => {
  const {frontmatter} = await getBlogPost(postParam);
  return {
    title: frontmatter.title,
    description: frontmatter.abstract,
  };
};

const BlogPostPage: BlogPostPg = async ({params: {postParam}}) => {
  try {
    const {frontmatter, content} = await getBlogPost(postParam);
    return (
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
    );
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default BlogPostPage;
