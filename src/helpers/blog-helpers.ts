import matter, {GrayMatterFile} from 'gray-matter';
import {readFile, readFolder} from '@/utils/file';
import {getPath} from '@/utils/path';

export const getBlogPostList = async () => {
  const fileNames = await readFolder('/src/data/next-blog');
  const blogPosts = [];

  for (let fileName of fileNames) {
    const rawContent = await readFile(getPath(`/data/${fileName}`));

    const {data: frontmatter} = matter(rawContent);

    blogPosts.push({
      slug: fileName.replace('.mdx', ''),
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
