import BlogPostCard from '../BlogPostCard';
import cls from './BlogPosts.module.css';

export interface BlogPostsProps {
  posts: {
    slug: string;
    title: string;
    publishedOn: string;
    abstract: string;
  }[];
}

const BlogPosts = ({posts}: BlogPostsProps) => {
  return (
    <ul className={cls.posts}>
      {posts.map(({slug, ...delegated}) => (
        <li key={slug}>
          <BlogPostCard slug={slug} {...delegated} />
        </li>
      ))}
    </ul>
  );
};

export default BlogPosts;
