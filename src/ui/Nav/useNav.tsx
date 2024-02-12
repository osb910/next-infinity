'use client';

import {usePathname} from 'next/navigation';
import {
  createContext,
  useContext,
  useId,
  useState,
  type ReactNode,
} from 'react';
import type {NavContextProps} from './types';

const NavContext = createContext<NavContextProps>({
  isOpen: false,
  hoveredItem: '',
  changeHovered: () => {},
  pathName: '',
  layoutId: '',
  toggleNav: () => {},
  openNav: () => {},
  closeNav: () => {},
});

export const NavProvider = ({children}: {children: ReactNode}): JSX.Element => {
  const [hoveredItem, setHoveredItem] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const pathName = usePathname();
  const layoutId = `nav-backdrop${useId()}`;

  const changeHovered = (slug: string) => setHoveredItem(slug);
  const toggleNav = () => setIsOpen(!isOpen);
  const closeNav = () => setIsOpen(false);
  const openNav = () => setIsOpen(true);

  return (
    <NavContext.Provider
      value={{
        isOpen,
        toggleNav,
        openNav,
        closeNav,
        hoveredItem,
        changeHovered,
        pathName,
        layoutId,
      }}
    >
      {children}
    </NavContext.Provider>
  );
};

export const useNav = () => {
  const data = useContext(NavContext);

  if (!data)
    throw new Error('Cannot consume Nav context without a NavProvider');

  return data;
};
