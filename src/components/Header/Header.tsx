'use client';

import {useState} from 'react';
import styled from 'styled-components';
import IconButton from '../../ui/IconButton/IconButton';
import Modal from '../Modal/Modal';
import Portal from '@/ui/Portal';
import SoundToggler from '../SoundToggler/SoundToggler';
import {Info} from 'react-feather';
import styles from './Header.module.css';
import SiteLogo from '../SiteLogo/SiteLogo';

const Header = ({children}: {children?: React.ReactNode}) => {
  const [showHelp, setShowHelp] = useState<boolean>(false);
  const openHelp = () => setShowHelp(true);
  const closeHelp = () => setShowHelp(false);
  return (
    <StyledHeader className={styles.header}>
      {children}
      <SiteLogo variant='secondary' />
      <section className={`${styles.settings} ${styles.app} settings app`}>
        <SoundToggler />
        <IconButton
          icon={<Info />}
          onClick={openHelp}
          highlightDeps={[showHelp]}
          title='Help'
        />
      </section>
      {/* {showHelp && (
        <Portal>
          <Modal title='Help' dismiss={closeHelp} dismissText='Dismiss'>
          </Modal>
        </Portal>
      )} */}
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
  }

  @media (min-width: 40rem) {
    padding-inline: 2rem;

    & h1 {
      font-size: 2rem;
    }
  }

  @media (min-width: 72rem) {
    & h1 {
      font-size: 2.25rem;
    }
  }
`;

export default Header;
