'use client';
import {RxHamburgerMenu} from 'react-icons/rx';
import styles from './NavBar.module.css';
import {useState} from 'react';

interface NavBarProps {}

const NavBar = ({}: NavBarProps) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  console.log({isNavOpen});
  return (
    <>
      {isNavOpen ? (
        <>
          <div
            onClick={() => setIsNavOpen(false)}
            className={styles.overlay}
          ></div>
          <ul className={`${styles.navBar} ${isNavOpen ? styles.open : ''}`}>
            <li>Home</li>
            <li>Posts</li>
          </ul>
        </>
      ) : (
        <RxHamburgerMenu
          onClick={() => setIsNavOpen(current => !current)}
          className={styles.hamburger}
        />
      )}
    </>
  );
};

export default NavBar;
