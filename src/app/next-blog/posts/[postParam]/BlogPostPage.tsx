import {notFound, redirect} from 'next/navigation';

import {getBlogPost} from '@/helpers/next-blog/requests';
import BlogHero from '@/components/next-blog/BlogHero';
import Mdx from '@/ui/Mdx';
import {Spinner} from '@/ui/Spinner';

import type {AppPage, GetMetadata, JsonRes} from '@/types';
import cls from './BlogPostPage.module.css';
import COMPONENT_MAP from '@/helpers/next-blog/mdx-components';

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
    // if (!data) redirect(`/next-blog/${postParam}?type=Post`);
    if (!data) notFound();
    return (
      <article className={cls.wrapper}>
        <BlogHero
          title={data.frontmatter.title}
          publishedOn={data.frontmatter.publishedOn}
        />
        <div className={cls.page}>
          <Mdx
            source={data.content}
            loader={<Spinner />}
            components={COMPONENT_MAP}
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
