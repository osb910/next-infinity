import {cache} from 'react';
import {loadBlogPost} from '@/helpers/next-blog/blog-helpers';
import BlogHero from '@/components/next-blog/BlogHero';
import Mdx from '@/ui/Mdx';
import {Spinner} from '@/ui/Spinner';
import type {AppPage, GetMetadata, JsonRes} from '@/types';
import cls from './BlogPostPage.module.css';
import Codum from '@/ui/Codum';

const fetcher = cache(async (postParam: string) => {
  const posts = await loadBlogPost(postParam);
  return posts;
});

export type BlogPostPg = AppPage<{postParam: string}>;

export const generateMetadata: GetMetadata<BlogPostPg> = async ({
  params: {postParam},
}) => {
  const {frontmatter, content} = await fetcher(postParam);
  return {
    title: frontmatter.title,
    description: frontmatter.abstract,
  };
};

const BlogPostPage: BlogPostPg = async ({params: {postParam}}) => {
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
            components={{Code: Codum}}
          />
        </div>
      </article>
    </>
  );
};

export default BlogPostPage;
