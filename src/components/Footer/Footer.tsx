import Link from 'next/link';
import cls from './Footer.module.css';
import appsInfo from '@/l10n/mini-apps/apps';
import Nav, {NavItem, NavLink, NavList, NavProvider} from '@/ui/Nav';
import IconLabel from '../next-blog/IconLabel';
import Icon from '@/ui/Icon';
import {FaDiscord} from 'react-icons/fa';

const navLinks = [
  {
    to: appsInfo['en'].links.github,
    label: (
      <IconLabel label='GitHub' className={cls.iconLink}>
        <Icon name='github' />
      </IconLabel>
    ),
  },
  {
    to: appsInfo['en'].links.linkedin,
    label: (
      <IconLabel label='LinkedIn' className={cls.iconLink}>
        <Icon name='linkedin' />
      </IconLabel>
    ),
  },
  {
    to: appsInfo['en'].links.twitter,
    label: (
      <IconLabel label='Twitter' className={cls.iconLink}>
        <Icon name='twitter' />
      </IconLabel>
    ),
  },
  {
    to: appsInfo['en'].links.discord,
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

const Footer = () => {
  return (
    <NavProvider>
      <footer className={cls.footer}>
        <section className={cls.body}>
          <p className={cls.attribution}>
            Created with ❤️ by{' '}
            <Link href={appsInfo['en'].links.github} target='_blank'>
              Omar Shareef
            </Link>
            .
          </p>
          <small className={cls.copyright}>
            All rights reserved | &copy; {new Date().getFullYear()}
          </small>
        </section>
        <Nav className={cls.nav}>
          <h2 className={cls.linkHeading}>Links</h2>
          <NavList className={cls.linkList}>
            {navLinks.map(({to, label}) => (
              <NavItem key={to} highlightClass={cls.highlight} slug={to}>
                <NavLink href={to}>{label}</NavLink>
              </NavItem>
            ))}
          </NavList>
        </Nav>
      </footer>
    </NavProvider>
  );
};

export default Footer;
