import BlogPostCard from '@/components/next-blog/BlogPostCard';
import styles from './HomePage.module.css';
import {getBlogPostList} from '@/helpers/next-blog/blog-helpers';
import {type Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Next Blog',
};

const HomePage = async () => {
  const posts = await getBlogPostList();
  return (
    <>
      <h1>Latest Content:</h1>
      <ul>
        {posts.map(({slug, title, abstract, publishedOn}) => (
          <li key={slug}>
            <BlogPostCard
              abstract={abstract}
              slug={slug}
              title={title}
              publishedOn={publishedOn}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default HomePage;
