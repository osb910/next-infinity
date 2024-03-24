import BlogPostCard from '../BlogPostCard';
import cls from './BlogPosts.module.css';

export interface BlogPostsProps {
  posts: {
    slug: string;
    title: string;
    publishedOn: string;
    abstract: string;
    body: string;
    category?: string;
    img?: string;
  }[];
}

const BlogPosts = ({posts}: BlogPostsProps) => {
  return (
    <ul className={cls.posts}>
      {posts.map(({slug, ...rest}) => (
        <li key={slug}>
          <BlogPostCard slug={slug} {...rest} />
        </li>
      ))}
    </ul>
  );
};

export default BlogPosts;
