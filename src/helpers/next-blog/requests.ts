import {cache} from 'react';
import {loadBlogPost} from './blog-helpers';

export const getBlogPost = cache(async (postParam: string) => {
  const posts = await loadBlogPost(postParam);
  return posts;
});
