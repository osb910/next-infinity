import matter, {GrayMatterFile} from 'gray-matter';
import {readFile, readDir} from '@/utils/file';

export const getBlogPostList = async () => {
  const files = await readDir('src/data/next-blog');
  const blogPosts = [];

  for (let file of files) {
    const {data: rawContent} = await readFile(`/data/next-blog/${file.name}`, {
      encoding: 'utf-8',
    });

    const {data: frontmatter} = matter(rawContent);

    blogPosts.push({
      slug: file.name.replace('.mdx', ''),
      ...frontmatter,
    });
  }
  // @ts-ignore
  return blogPosts.sort((p1, p2) => (p1.publishedOn < p2.publishedOn ? 1 : -1));
};

export const loadBlogPost = async (slug: string) => {
  const {data: rawContent} = await readFile(`/data/next-blog/${slug}.mdx`, {
    encoding: 'utf-8',
  });

  const {data: frontmatter, content} = matter(rawContent);

  return {frontmatter, content};
};
