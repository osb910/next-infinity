import BlogPostCard from '@/components/next-blog/BlogPostCard';
import styles from './HomePage.module.css';
import './styles.css';

const HomePage = async () => {
  return (
    <main className={styles.wrapper}>
      <h1 className={styles.mainHeading}>Latest Content:</h1>

      {/* TODO: Iterate over the data read from the file system! */}
      <BlogPostCard
        slug='example'
        title='Hello world!'
        abstract="This is a placeholder, an example which shows how the “BlogSummaryCard” component should be used. You'll want to swap this out based on the data from the various MDX files!"
        publishedOn={new Date()}
      />
    </main>
  );
};

export default HomePage;
