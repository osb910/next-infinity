import Image from 'next/image';
import cls from './BlogHero.module.css';

export interface BlogHeroProps {}

const BlogHero = ({}: BlogHeroProps) => {
  return (
    <section className={cls.hero}>
      <h1>Hi, I&apos;m Omar</h1>
      <p>
        I blog about web development, translation, and the Arabic language.
        💻🌐🖊️📗
      </p>
      <figure className={cls.image}>
        <Image
          src='/img/next-blog/omar.png'
          alt='An image showing Omar'
          width={480}
          height={480}
        />
      </figure>
    </section>
  );
};

export default BlogHero;
