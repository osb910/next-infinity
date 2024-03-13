import Link from 'next/link';
import {Rss} from 'react-feather';
import clsx from 'clsx';
import Navigation from '@/components/next-blog/Navigation';
import Logo from '@/components/next-blog/Logo';
import ThemeSwitch from '@/ui/ThemeSwitch';
import SfxSwitch from '@/ui/SfxSwitch';
import IconButton from '@/ui/IconButton';
import VisuallyHidden from '@/ui/VisuallyHidden';
import Switch from '@/ui/Switch';
import cls from './Header.module.css';

interface HeaderProps {
  theme: 'light' | 'dark';
  userId: string;
}

const btnAnimation = {
  backgroundColor: 'hsla(0, 0%, 50%, 0.3)',
  boxShadow: '0 0 0 4px hsla(0, 0%, 50%, 0.3)',
};

const Header = ({theme, userId}: HeaderProps) => {
  return (
    <header className={clsx(cls.header)}>
      <Link href='/next-blog' className={cls.logo}>
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
      </section>
    </header>
  );
};

export default Header;
