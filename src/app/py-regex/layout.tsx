import {type Metadata} from 'next';
import {type ReactNode} from 'react';
import styles from './PyRegex.module.css';

export const metadata: Metadata = {};

const PyRegexLayout = async ({children}: {children: ReactNode}) => {
  return (
    <>{children}</>
  );
};

export default PyRegexLayout;
