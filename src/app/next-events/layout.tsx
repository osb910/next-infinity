import MainHeader from '@/components/events/MainHeader';
import styles from './layout.module.css';
import {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Next Events',
  description: 'Find a lot of great beneficial events',
};

const RootLayout = async ({children}: {children: React.ReactNode}) => {
  return (
    <>
      <MainHeader />
      <main className={styles.main}>{children}</main>
    </>
  );
};

export default RootLayout;
