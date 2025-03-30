import {type Metadata} from 'next';
import {type ReactNode} from 'react';

export const metadata: Metadata = {};

const BlogPostsPageLayout = async ({children}: {children: ReactNode}) => {
  return <>{children}</>;
};

export default BlogPostsPageLayout;
