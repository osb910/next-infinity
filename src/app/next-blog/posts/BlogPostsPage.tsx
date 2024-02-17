import {type Metadata} from 'next';
import type {AppPage, JsonRes} from '@/types';
import styles from './BlogPostsPage.module.css';

export const metadata: Metadata = {
  title: 'BlogPostsPage'
};

const BlogPostsPage: AppPage<{}> = async ({}) => {
  return (
    <section className={styles.BlogPostsPage}>BlogPostsPage</section>
  )
}

export default BlogPostsPage;
