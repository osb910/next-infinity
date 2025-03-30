import {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Add Store',
  description: 'Add a new store',
};

const RootLayout = async ({children}: {children: React.ReactNode}) => {
  return <>{children}</>;
};

export default RootLayout;
