import Link from 'next/link';

import Logo from '@/components/next-blog/Logo';

import DecorativeSwoops from './DecorativeSwoops';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.wrapper}>
      <DecorativeSwoops />
      <section className={styles.content}>
        <div>
          <Logo width='10rem' />
          {/*
            NOTE: If you'd like to build your blog on top
            of this code, the license requires that you leave
            this paragraph untouched. Check out LICENSE.md
            for more information.
          */}
          <p className={styles.attribution}>
            Blog template created by{' '}
            <a href='https://www.joshwcomeau.com/'>Josh W. Comeau</a>. Check out{' '}
            <a href='https://www.joyofreact.com/'>The Joy of React</a> to learn
            how to build dynamic React apps like this one!
          </p>
        </div>
        <nav>
          <h2 className={styles.linkHeading}>Links</h2>
          <ul className={styles.linkList}>
            <li>
              <Link href='/next-blog/rss'>RSS feed</Link>
            </li>
            <li>
              <Link href='/next-blog/todo'>Terms of Use</Link>
            </li>
            <li>
              <Link href='/next-blog/todo'>Privacy Policy</Link>
            </li>
            <li>
              <a href='https://twitter.com/JoshWComeau'>Twitter</a>
            </li>
          </ul>
        </nav>
      </section>
    </footer>
  );
}

export default Footer;
