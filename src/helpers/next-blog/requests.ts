import {cache} from 'react';
// import {loadBlogPost} from './blog-helpers';
import {readFile} from '@/utils/file';
import matter from 'gray-matter';

export const getBlogPost = cache(async (postParam: string) => {
  const {data, message, code} = await readFile(
    `src/data/next-blog/${postParam}.mdx`,
    {
      encoding: 'utf-8',
    }
  );

  if (!data) return null;

  const {data: frontmatter, content} = matter(data);

  return {data: {frontmatter, content}, message, code};
});
