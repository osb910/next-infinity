'use client';

import useTimers from '@/store/next-timer/useTimers';
import cls from './Header.module.css';

const Header = () => {
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
