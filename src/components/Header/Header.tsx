'use client';

import {useState} from 'react';
import styled from 'styled-components';
import IconButton from '../IconButton/IconButton';
import Modal from '../Modal/Modal';
import Portal from '../Portal';
import SoundToggler from '../SoundToggler/SoundToggler';
import {Info, SkipBack} from 'react-feather';
import Link from 'next/link';
import styles from './Header.module.css';

const Header = ({children}: {children?: React.ReactNode}) => {
  const [showHelp, setShowHelp] = useState<boolean>(false);
  const openHelp = () => setShowHelp(true);
  const closeHelp = () => setShowHelp(false);
  return (
    <StyledHeader className={styles.header}>
      {children}
      <Link className={styles.link} href='/'>
        <SkipBack size={12} />
        <h2>Next 30</h2>
      </Link>
      <section className={`${styles.settings} ${styles.app} settings app`}>
        <SoundToggler />
        <IconButton
          clickHandler={openHelp}
          icon={<Info />}
          highlightDeps={[showHelp]}
          title='Help'
        />
      </section>
      {showHelp && (
        <Portal>
          <Modal title='Help' dismiss={closeHelp} dismissText='Dismiss'>
            {/* <Help /> */}
          </Modal>
        </Portal>
      )}
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  /* padding-block: 0.5em;
  padding-inline: 0.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas: 'subtitle title app-settings';
  justify-content: space-between;
  align-items: baseline;
  text-align: center;
  color: rgb(var(--color-primary-rgb));
  background-color: rgb(var(--bg-elevated-rgb));
  border-block-end: 2px dashed currentColor; */

  & .side {
    width: var(--header-height);
    display: grid;
    place-content: center;
  }

  a:has(h1, h2, h3) {
    display: flex;
    align-items: baseline;
    color: inherit;
    text-decoration: none;
  }

  a:has(h1, h2, h3):hover svg {
    color: rgb(var(--color-accent-rgb));
  }

  & h1 {
    grid-area: title;
    font-size: 1.5rem;
    text-align: center;
    padding: 0;
  }

  & h2 sub {
    letter-spacing: -2px;
    font-size: 0.625em;
  }

  & h2 {
    grid-area: subtitle;
    font-size: 1.125rem;
    text-align: start;
    justify-self: start;
  }

  & .settings {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5em;
  }

  & .settings.app {
    grid-area: app-settings;
    align-self: center;
    justify-self: end;
  }

  & .settings.game {
    grid-area: game-settings;
  }

  & .settings-modal {
    width: 100%;
    min-width: 500px;
    max-block-size: 80vh;
    background-color: navy;
  }

  @media (min-width: 28rem) {
    padding-inline: 1rem;
    & h1 {
      font-size: 1.65rem;
    }

    & h2 {
      grid-area: subtitle;
      font-size: 1.25rem;
    }
  }

  @media (min-width: 40rem) {
    padding-inline: 2rem;

    & h1 {
      font-size: 2rem;
    }

    & h2 {
      grid-area: subtitle;
      font-size: 1.5rem;
    }
  }

  @media (min-width: 72rem) {
    & h1 {
      font-size: 2.25rem;
    }
  }
`;

export default Header;
