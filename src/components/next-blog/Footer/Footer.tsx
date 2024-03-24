import Link from 'next/link';
import Logo from '@/components/next-blog/Logo';
import DecorativeSwoops from './DecorativeSwoops';
import Nav, {NavList, NavItem, NavProvider, NavLink} from '@/ui/Nav';
import cls from './Footer.module.css';
import siteInfo from '@/l10n/next-blog/site';
import Icon from '@/ui/Icon/lucide';
import {FaDiscord} from 'react-icons/fa';
import IconLabel from '../IconLabel';

const navLinks = [
  {
    to: '/api/next-blog/rss',
    label: (
      <IconLabel label='RSS' className={cls.iconLink}>
        <Icon name='rss' />
      </IconLabel>
    ),
    external: true,
  },
  {
    to: siteInfo['en'].links.github,
    label: (
      <IconLabel label='GitHub' className={cls.iconLink}>
        <Icon name='github' />
      </IconLabel>
    ),
  },
  {
    to: siteInfo['en'].links.linkedin,
    label: (
      <IconLabel label='LinkedIn' className={cls.iconLink}>
        <Icon name='linkedin' />
      </IconLabel>
    ),
  },
  {
    to: siteInfo['en'].links.twitter,
    label: (
      <IconLabel label='Twitter' className={cls.iconLink}>
        <Icon name='twitter' />
      </IconLabel>
    ),
  },
  {
    to: siteInfo['en'].links.discord,
    label: (
      <IconLabel label='Discord' className={cls.iconLink}>
        <FaDiscord />
      </IconLabel>
    ),
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
          <p className={cls.description}>{siteInfo['en'].description}</p>
          <p className={cls.attribution}>
            Blog created with ❤️ by{' '}
            <Link href={siteInfo['en'].links.github} target='_blank'>
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
          <small className={cls.copyright}>
            All rights reserved | Copyright {new Date().getFullYear()}
          </small>
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
