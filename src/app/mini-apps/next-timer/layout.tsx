import {type Metadata} from 'next';
import {type ReactNode} from 'react';
import cls from './NextTimer.module.css';
import Header from '@/components/next-timer/Header';
import {TimersProvider} from '@/store/next-timer/useTimers';
import './styles.css';

export const metadata: Metadata = {};

const NextTimerLayout = async ({children}: {children: ReactNode}) => {
  return (
    <TimersProvider>
      <Header />
      <main className={cls.main}>{children}</main>
    </TimersProvider>
  );
};

export default NextTimerLayout;
