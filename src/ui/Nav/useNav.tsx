'use client';

import {usePathname} from 'next/navigation';
import {
  createContext,
  ReactElement,
  useContext,
  useId,
  useState,
  type ReactNode,
} from 'react';
import type {NavContextProps} from './types';
import useToggle from '@/hooks/useToggle';

const NavContext = createContext<NavContextProps>({
  isOpen: false,
  hoveredItem: '',
  changeHovered: () => {},
  pathName: '',
  layoutId: '',
  toggleNav: () => {},
});

export const NavProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  const [hoveredItem, setHoveredItem] = useState('');
  const [isOpen, toggleNav] = useToggle(false);
  const pathName = usePathname();
  const layoutId = `nav-backdrop${useId()}`;

  const changeHovered = (slug: string) => setHoveredItem(slug);

  return (
    <NavContext.Provider
      value={{
        isOpen,
        toggleNav,
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
