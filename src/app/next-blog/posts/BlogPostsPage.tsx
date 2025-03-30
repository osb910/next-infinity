import type {AppPage, GetMetadata} from '@/types';
import {getBlogPostList} from '@/helpers/next-blog/blog-helpers';
import BlogPosts from '@/components/next-blog/BlogPosts';
import cls from './BlogPostsPage.module.css';
import {pluralize} from '@/utils/numbers';
import {getLocale} from '@/l10n/getL10n';
import parseDistinctive from '@/lib/text/ar/distinctive-parsing';
import {localize} from '@/l10n';

export type BlogPostPg = AppPage;
export type BlogPostsGenMetadata = GetMetadata;

export const generateMetadata: BlogPostsGenMetadata = async () => {
  const [
    locale,
    // posts
  ] = await Promise.all([
    getLocale(),
    // getBlogPostList()
  ]);
  const {l6e} = await localize(locale);
  return {
    title: l6e('nextBlog.articles.title'),
    description: l6e('nextBlog.articles.description'),
  };
};

const BlogPostsPage: AppPage = async () => {
  try {
    const [locale, posts] = await Promise.all([getLocale(), getBlogPostList()]);
    const {l6e} = await localize(locale);
    const postCount =
      locale === 'ar'
        ? parseDistinctive(posts.length, {
            sng: 'مقالة',
            dual: 'مقالتان',
            plr: 'مقالات',
            parsing: 'nominative',
            keepSign: false,
          })
        : pluralize('post', posts.length);
    return (
      <>
        <section className={cls.title}>
          <h2>{l6e('nextBlog.articles.allPosts')}</h2>
          <p>{postCount}</p>
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
