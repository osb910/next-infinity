import {delay} from '@/utils/promises';
import {cache} from 'react';

export const getNavLinks = cache(async () => {
  console.info('Requesting navigation links from CMS');
  await delay(1800);

  return LINKS;
});

const LINKS = [
  {
    slug: 'platform',
    label: 'Platform',
    href: '/platform',
    type: 'primary',
  },
  {
    slug: 'solutions',
    label: 'Solutions',
    href: '/solutions',
  },
  {
    slug: 'integrations',
    label: 'Integrations',
    href: '/integrations',
  },
  {
    slug: 'docs',
    label: 'Docs',
    href: '/documentation/start-here',
  },
  {
    slug: 'pricing',
    label: 'Pricing',
    href: '/pricing',
  },
];

export type NavLink = (typeof LINKS)[0];
