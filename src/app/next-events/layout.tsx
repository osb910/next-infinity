import MainHeader from '@/components/events/MainHeader';
import styles from './layout.module.css';
import {Metadata} from 'next';
import {SearchFiltersProvider} from '@/hooks/useSearchFilters';

export const metadata: Metadata = {
  title: 'Next Events',
  description: 'Find a lot of great beneficial events',
};

const RootLayout = async ({children}: {children: React.ReactNode}) => {
  return (
    <SearchFiltersProvider>
      <MainHeader />
      <main className={styles.main}>{children}</main>
    </SearchFiltersProvider>
  );
};

export default RootLayout;
