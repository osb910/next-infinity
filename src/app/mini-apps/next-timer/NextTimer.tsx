import {type Metadata} from 'next';
import type {AppPage} from '@/types';
import AddTimer from '@/components/next-timer/AddTimer';
import Timers from '@/components/next-timer/Timers';

export const metadata: Metadata = {
  title: 'NextTimer',
};

const NextTimer: AppPage = async () => {
  return (
    <>
      <AddTimer />
      <Timers />
    </>
  );
};

export default NextTimer;
