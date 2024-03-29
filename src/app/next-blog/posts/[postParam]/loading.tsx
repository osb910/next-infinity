import {BlogPostHeroLoading} from '@/components/next-blog/BlogPostHero';
import cls from './BlogPostPage.module.css';
import {range} from '@/utils/numbers';

const BlogPostPageLoading = () => {
  return (
    <article className={cls.wrapper}>
      <BlogPostHeroLoading
        slug='blog-post-slug'
        readingTime='0 min read'
        title={`Blog Post Loading Title`}
        publishedOn={new Date().toISOString()}
      />
      <div className={cls.page} style={{fontFamily: 'var(--fn-loading)'}}>
        {range(3).map(n => (
          <p key={n}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab ullam,
            illum nihil beatae temporibus eius minima. Est amet nostrum quia
            omnis porro, facilis doloribus. Quia voluptas doloremque cum dolorum
            consequatur.
          </p>
        ))}
      </div>
    </article>
  );
};

export default BlogPostPageLoading;
