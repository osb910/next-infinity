import matter from 'gray-matter';
import {readFile, readDir} from '@/utils/file';
import {cache} from 'react';

type Post = {
  slug: string;
  title: string;
  abstract: string;
  body: string;
  publishedOn: string;
};

export const getBlogPostList = cache(async () => {
  const files = await readDir('src/data/next-blog');
  const blogPosts = [];

  for (const file of files) {
    const fileData = await readFile(`src/data/next-blog/${file.name}`, {
      encoding: 'utf-8',
    });

    const rawContent = fileData.data as unknown as string;

    const {data: frontmatter, content} = matter(rawContent);

    blogPosts.push({
      slug: file.name.replace('.mdx', ''),
      ...frontmatter,
      body: content,
    });
  }
  return blogPosts.sort((p1, p2) =>
    (p1 as Post).publishedOn < (p2 as Post).publishedOn ? 1 : -1
  ) as Array<Post>;
});

export const loadBlogPost = async (slug: string) => {
  const file = await readFile(`src/data/next-blog/${slug}.mdx`, {
    encoding: 'utf-8',
  });
  const rawContent = file.data as unknown as string;

  const {data: frontmatter, content} = matter(rawContent);

  return {frontmatter, content};
};
