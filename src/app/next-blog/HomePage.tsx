import {getBlogPostList} from '@/helpers/next-blog/blog-helpers';
import {type Metadata} from 'next';
import BlogHero from '@/components/next-blog/BlogHero';
import BlogPosts from '@/components/next-blog/BlogPosts';
import cls from './HomePage.module.css';

export const metadata: Metadata = {
  title: 'Next Blog',
};

const HomePage = async () => {
  try {
    const posts = await getBlogPostList();
    return (
      <>
        <BlogHero />
        <h2>Latest Content:</h2>
        <BlogPosts posts={posts} />
      </>
    );
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default HomePage;
