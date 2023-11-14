import styles from './Tags.module.css';
import {Metadata} from 'next';

export const metadata: Metadata = {};

const RootLayout = async ({children}: {children: React.ReactNode}) => {
  return <>{children}</>;
};

export default RootLayout;
