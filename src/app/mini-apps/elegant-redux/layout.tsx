import {type Metadata} from 'next';
import {type ReactNode} from 'react';
import cls from './ElegantRedux.module.css';
import './styles.css';
import {ElegantProvider} from '@/store/elegant-redux/store';

export const metadata: Metadata = {};

const ElegantReduxLayout = async ({children}: {children: ReactNode}) => {
  return <ElegantProvider>{children}</ElegantProvider>;
};

export default ElegantReduxLayout;
