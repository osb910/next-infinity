'use client';

import useTimers from '@/store/next-timer/useTimers';
import cls from './Header.module.css';

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  const {isRunning, toggleTimers} = useTimers();
  return (
    <header className={cls.header}>
      <h1>ReactTimer</h1>

      <button onClick={toggleTimers}>
        {isRunning ? 'Stop' : 'Start'} Timers
      </button>
    </header>
  );
};

export default Header;
