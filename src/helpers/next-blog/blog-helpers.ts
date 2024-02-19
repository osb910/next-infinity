import matter from 'gray-matter';
import {readFile, readDir} from '@/utils/file';

type Post = {
  slug: string;
  title: string;
  abstract: string;
  publishedOn: Date;
};

export const getBlogPostList = async () => {
  const files = await readDir('src/data/next-blog');
  const blogPosts = [];

  for (let file of files) {
    const {data: rawContent} = await readFile(
      `src/data/next-blog/${file.name}`,
      {
        encoding: 'utf-8',
      }
    );

    const {data: frontmatter} = matter(rawContent);

    blogPosts.push({
      slug: file.name.replace('.mdx', ''),
      ...frontmatter,
    });
  }
  return blogPosts.sort((p1, p2) =>
    (p1 as Post).publishedOn < (p2 as Post).publishedOn ? 1 : -1
  ) as Array<Post>;
};

export const loadBlogPost = async (slug: string) => {
  const {data: rawContent} = await readFile(`src/data/next-blog/${slug}.mdx`, {
    encoding: 'utf-8',
  });

  const {data: frontmatter, content} = matter(rawContent);

  return {frontmatter, content};
};
