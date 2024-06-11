import {type Metadata} from 'next';
import type {AppPage} from '@/types';
import styles from './Login.module.css';

export const metadata: Metadata = {
  title: 'Login',
};

const Login: AppPage<{}> = async ({}) => {
  return <section className={styles.Login}>Login</section>;
};

export default Login;
