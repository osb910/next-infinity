import styles from './Login.module.css';
import {Metadata} from 'next';

export const metadata: Metadata = {};

const RootLayout = async ({children}: {children: React.ReactNode}) => {
  return (
    <>
      <main className={styles.main}>{children}</main>
    </>
  );
};

export default RootLayout;
