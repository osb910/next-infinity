import Link from 'next/link';
import {Rss} from 'react-feather';
import clsx from 'clsx';
import {localize} from '@/l10n/next-blog/getL10n';
import {langs} from '@/l10n/next-blog/config';
import Navigation from '@/components/next-blog/Navigation';
import Logo from '@/components/next-blog/Logo';
import ThemeSwitch from '@/ui/ThemeSwitch';
import SfxSwitch from '@/ui/SfxSwitch';
import IconButton from '@/ui/IconButton';
import {NavProvider} from '@/ui/Nav';
import VisuallyHidden from '@/ui/VisuallyHidden';
import StickyHeader from './StickyHeader';
import Localizer from '@/ui/Localizer';
import type {Locale} from '@/l10n/next-blog/l10n.types';
import type {CSSProps} from '@/types';
import cls from './Header.module.css';

interface HeaderProps {
  locale: Locale;
  theme: 'light' | 'dark';
  userId: string;
}

const btnAnimation = {
  backgroundColor: 'hsla(0, 0%, 50%, 0.3)',
  boxShadow: '0 0 0 6px hsla(0, 0%, 50%, 0.3)',
};

const Header = async ({locale, theme, userId}: HeaderProps) => {
  const {l10n} = await localize({locale});

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
        <Navigation />
        <section className={cls.settings}>
          <ThemeSwitch
            whileHover={btnAnimation}
            whileFocus={btnAnimation}
            className={cls.themeSwitch}
          />
          <SfxSwitch
            whileHover={btnAnimation}
            whileFocus={btnAnimation}
            className={cls.sfxSwitch}
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
              whileHover={btnAnimation}
              whileFocus={btnAnimation}
              className={cls.rssBtn}
            >
              <VisuallyHidden>View RSS feed</VisuallyHidden>
            </IconButton>
          </Link>
          <Localizer
            locale={locale}
            langs={langs}
            className={cls.localizer}
            bgMenu='var(--bg-gdt-1)'
            bgActive='var(--bg-gdt-3)'
            displayLang
            whileHover={btnAnimation}
            whileFocus={btnAnimation}
          />
        </section>
      </StickyHeader>
    </NavProvider>
  );
};

export default Header;
