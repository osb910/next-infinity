import {type Metadata} from 'next';
import {type ReactNode} from 'react';
import styles from './BlogPostPage.module.css';

export const metadata: Metadata = {};

const BlogPostPageLayout = async ({children}: {children: ReactNode}) => {
  return (
    <>{children}</>
  );
};

export default BlogPostPageLayout;
