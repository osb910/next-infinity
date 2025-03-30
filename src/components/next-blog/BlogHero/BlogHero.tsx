import Image from 'next/image';
import cls from './BlogHero.module.css';
import {getLocale} from '@/l10n/getL10n';
import {localize} from '@/l10n';

const BlogHero = async () => {
  const locale = await getLocale();
  const {l6e} = await localize(locale);
  return (
    <section className={cls.hero}>
      <h1>{l6e('nextBlog.home.hero.hi')}</h1>
      <p>{l6e('nextBlog.home.hero.about')}</p>
      <figure className={cls.image}>
        <Image
          src='/img/next-blog/omar.png'
          alt={l6e('nextBlog.home.omarPicAlt')}
          width={480}
          height={480}
        />
      </figure>
    </section>
  );
};

export default BlogHero;
