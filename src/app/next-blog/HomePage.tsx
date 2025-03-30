import {getBlogPostList} from '@/helpers/next-blog/blog-helpers';
import {type Metadata} from 'next';
import BlogHero from '@/components/next-blog/BlogHero';
import BlogPosts from '@/components/next-blog/BlogPosts';
import {getLocale} from '@/l10n/getL10n';
import {localize} from '@/l10n';

export const metadata: Metadata = {
  title: 'Next Blog',
};

const HomePage = async () => {
  try {
    const [locale, posts] = await Promise.all([getLocale(), getBlogPostList()]);
    const {l6e} = await localize(locale);
    return (
      <>
        <BlogHero />
        <h2>{l6e('nextBlog.home.latest')}</h2>
        <BlogPosts posts={posts} />
      </>
    );
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default HomePage;
