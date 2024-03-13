import Link from 'next/link';
import Logo from '@/components/next-blog/Logo';
import DecorativeSwoops from './DecorativeSwoops';
import Nav, {NavList, NavItem, NavProvider, NavLink} from '@/ui/Nav';
import clsx from 'clsx';
import cls from './Footer.module.css';

const navLinks = [
  {
    to: '/api/next-blog/rss',
    label: 'RSS feed',
    external: true,
  },
  {
    to: 'https://twitter.com/omarshdev',
    label: 'Twitter',
  },
  {
    to: '/',
    label: 'Next Infinity',
  },
];

function Footer() {
  return (
    <NavProvider>
      <footer className={cls.footer}>
        <DecorativeSwoops />
        <section className={cls.body}>
          <Logo width='10rem' />
          <p className={cls.attribution}>
            Blog created by{' '}
            <Link href='https://www.github.com/osb910' target='_blank'>
              Omar Shareef
            </Link>
            .
          </p>
          <p className={cls.attribution}>
            Blog template created by{' '}
            <Link href='https://www.joshwcomeau.com/' target='_blank'>
              Josh W. Comeau
            </Link>
            . Check out{' '}
            <Link href='https://www.joyofreact.com/' target='_blank'>
              The Joy of React
            </Link>{' '}
            to learn how to build dynamic React apps like this one!
          </p>
        </section>
        <Nav className={cls.nav}>
          <h2 className={cls.linkHeading}>Links</h2>
          <NavList className={cls.linkList}>
            {navLinks.map(({to, label, external}) => (
              <NavItem key={to} highlightClass={cls.highlight} slug={to}>
                <NavLink href={to} external={external}>
                  {label}
                </NavLink>
              </NavItem>
            ))}
          </NavList>
        </Nav>
      </footer>
    </NavProvider>
  );
}

export default Footer;
