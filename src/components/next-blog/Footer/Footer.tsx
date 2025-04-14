import Link from 'next/link';
import Logo from '@/components/next-blog/Logo';
import DecorativeSwoops from './DecorativeSwoops';
import Nav, {NavList, NavItem, NavProvider, NavLink} from '@/ui/Nav';
import cls from './Footer.module.css';
import Icon from '@/ui/Icon/lucide';
import {FaDiscord} from 'react-icons/fa';
import IconLabel from '../IconLabel';
import type {Locale} from '@/l10n/l10n.types';
import {localize} from '@/l10n';

interface FooterProps {
  locale: Locale;
}

const Footer = async ({locale}: FooterProps) => {
  const {l6e, L6e} = await localize(locale);
  const navLinks = [
    {
      to: l6e('nextBlog.links.rss'),
      label: (
        <IconLabel
          label={l6e('nextBlog.links.rssLabel')}
          className={cls.iconLink}
        >
          <Icon name='rss' />
        </IconLabel>
      ),
      external: true,
    },
    {
      to: l6e('nextBlog.links.github'),
      label: (
        <IconLabel
          label={l6e('nextBlog.links.githubLabel')}
          className={cls.iconLink}
        >
          <Icon name='github' />
        </IconLabel>
      ),
    },
    {
      to: l6e('nextBlog.links.linkedin'),
      label: (
        <IconLabel
          label={l6e('nextBlog.links.linkedinLabel')}
          className={cls.iconLink}
        >
          <Icon name='linkedin' />
        </IconLabel>
      ),
    },
    {
      to: l6e('nextBlog.links.twitter'),
      label: (
        <IconLabel
          label={l6e('nextBlog.links.twitterLabel')}
          className={cls.iconLink}
        >
          <Icon name='twitter' />
        </IconLabel>
      ),
    },
    {
      to: l6e('nextBlog.links.discord'),
      label: (
        <IconLabel
          label={l6e('nextBlog.links.discordLabel')}
          className={cls.iconLink}
        >
          <FaDiscord />
        </IconLabel>
      ),
    },
    {
      to: '/',
      label: l6e('nextInfinity.site.title'),
    },
  ];
  return (
    <NavProvider>
      <footer className={cls.footer}>
        <section className={cls.body}>
          <Logo width='10rem' />
          <p className={cls.description}>{l6e('nextBlog.site.description')}</p>
          <p className={cls.attribution}>
            <L6e
              k='nextBlog.footer.blogCredit'
              options={{ghLink: l6e('nextBlog.links.github')}}
            />
          </p>
          <p className={cls.attribution}>
            <L6e k='nextBlog.footer.blogTemplateCredit' />
          </p>
          <small className={cls.copyright}>
            <L6e k='nextBlog.footer.copyright' />
          </small>
        </section>
        <Nav className={cls.nav}>
          <h2 className={cls.linkHeading}>{l6e('nextBlog.footer.links')}</h2>
          <NavList className={cls.linkList}>
            {navLinks.map(({to, label, external}) => (
              <NavItem
                key={to}
                highlightClass={cls.highlight}
                slug={to}
              >
                <NavLink
                  href={to}
                  external={external}
                >
                  {label}
                </NavLink>
              </NavItem>
            ))}
          </NavList>
        </Nav>
      </footer>
    </NavProvider>
  );
};

export default Footer;
