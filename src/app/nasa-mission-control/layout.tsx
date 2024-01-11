import styles from './HomePage.module.css';
import {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'NASA Mission Control',
  description:
    'Futuristic NASA Mission Control Panel built with React, Next.js, and Arwes.',
};

const RootLayout = async ({children}: {children: React.ReactNode}) => {
  return <>{children}</>;
};

export default RootLayout;
