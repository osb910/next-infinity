import Link from 'next/link';
import {Rss} from 'react-feather';
import clsx from 'clsx';
import {localize} from '@/l10n';
import {langs} from '@/l10n/config';
import Navigation from '@/components/next-blog/Navigation';
import Logo from '@/components/next-blog/Logo';
import ThemeSwitch from '@/ui/ThemeSwitch';
import SfxSwitch from '@/ui/SfxSwitch';
import IconButton from '@/ui/IconButton';
import {NavProvider} from '@/ui/Nav';
import VisuallyHidden from '@/ui/VisuallyHidden';
import StickyHeader from './StickyHeader';
import Localizer from '@/ui/Localizer';
import type {Locale} from '@/l10n/l10n.types';
import type {CSSProps} from '@/types';
import cls from './Header.module.css';

interface HeaderProps {
  locale: Locale;
  theme: 'light' | 'dark';
}

const btnAnimation = {
  backgroundColor: 'hsla(0, 0%, 50%, 0.3)',
  boxShadow: '0 0 0 6px hsla(0, 0%, 50%, 0.3)',
};

const transition = {
  damping: 10,
  stiffness: 400,
};

const Header = async ({locale, theme}: HeaderProps) => {
  const {l6e} = await localize(locale);

  const navLinks = [
    {
      to: '/next-blog/posts',
      label: l6e('nextBlog.nav.articles'),
    },
    {
      to: '/next-blog/contact',
      label: l6e('nextBlog.nav.contact'),
    },
  ];

  const style: CSSProps = {
    '--border-gdt': `linear-gradient(${
      locale === 'ar' ? '270' : '90'
    }deg, var(--primary-100) 0%, var(--primary-700))`,
  };
  return (
    <NavProvider>
      <StickyHeader
        className={clsx(cls.header)}
        style={style}
      >
        <Link
          href='/next-blog'
          className={cls.logo}
        >
          <Logo width='12rem' />
        </Link>
        <Navigation navLinks={navLinks} />
        <section className={cls.settings}>
          <ThemeSwitch
            whileHover={btnAnimation}
            whileFocus={btnAnimation}
            transition={transition}
            // className={cls.themeSwitch}
          />
          <SfxSwitch
            whileHover={btnAnimation}
            whileFocus={btnAnimation}
            transition={transition}
            // className={cls.sfxSwitch}
          />
          <Link href='/api/next-blog/rss'>
            <IconButton
              icon={
                <Rss
                  style={{
                    // Optical alignment
                    transform: 'translate(2px, -2px)',
                  }}
                />
              }
              transition={transition}
              whileHover={btnAnimation}
              whileFocus={btnAnimation}
              // className={cls.rssBtn}
            >
              <VisuallyHidden>View RSS feed</VisuallyHidden>
            </IconButton>
          </Link>
          <Localizer
            locale={locale}
            langs={langs}
            method='cookie'
            className={cls.localizer}
            style={{color: 'var(--blog-primary-700)'}}
            bgMenu='transparent'
            bgActive='hsl(var(--blog-decorative-hsl-500), 0.6)'
            bgHover='hsl(var(--blog-decorative-hsl-300), 0.6)'
            displayLang
            transition={transition}
            whileHover={{...btnAnimation, scale: 1}}
            whileFocus={{...btnAnimation, scale: 1}}
          />
        </section>
      </StickyHeader>
    </NavProvider>
  );
};

export default Header;
