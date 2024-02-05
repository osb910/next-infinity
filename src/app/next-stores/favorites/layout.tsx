import styles from './Favorites.module.css';
import {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Favorites',
};

const RootLayout = async ({children}: {children: React.ReactNode}) => {
  return <>{children}</>;
};

export default RootLayout;
