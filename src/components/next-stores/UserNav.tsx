'use client';

import {useRouter, useSearchParams, usePathname} from 'next/navigation';
import Image from 'next/image';
import {useEffect, useState} from 'react';
import {User, UserPlus, LogIn, LogOut, Heart} from 'react-feather';
import ky from 'ky';
import useUser from './useUser';
import useToaster from '../Toaster/use-toaster';
import RegisterForm from '@/components/next-stores/RegisterForm';
import LoginForm from '@/components/next-stores/LoginForm';
import EditAccountForm from './EditAccountForm';
import ForgotPassForm from './ForgotPassForm';
import ChangePasswordForm from './ChangePasswordForm';
import Tabbed from '../Tabbed';
import NavLink from './NavLink';
import Portal from '../../ui/Portal';
import Modal from '../Modal';
import Spinner from '../../ui/Spinner';
import {type IUser} from '@/services/next-stores/user';
import styles from './UserNav.module.css';

const UserNav = ({
  user,
  logoutEndpoint = '/api/auth/logout',
}: {
  user: IUser | null;
  logoutEndpoint?: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {userData, setUserData} = useUser();
  const {createToast} = useToaster();
  const [subPage, setSubPage] = useState<string | null>(() =>
    searchParams.get('dialog')
  );
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!(userData ?? user);
  });
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const resetToken = searchParams.get('reset-token');

  const dismissSubPage = () => {
    setSubPage(null);
    router.replace(pathname);
  };

  const logout = async () => {
    setIsLoggingOut(true);
    try {
      const json = (await ky.post(logoutEndpoint).json()) as {
        status: 'success' | 'error';
        message: string;
      };
      if (json.status === 'success') {
        setUserData(null);
        setIsLoggedIn(false);
        createToast('success', <p>{json.message}</p>, 3000);
        router.refresh();
      } else {
        throw new Error(json.message);
      }
    } catch (err) {
      if (!(err instanceof Error)) return;
      console.error(err);
      createToast('error', <p>{err.message}</p>, 5000);
    }
    setIsLoggingOut(false);
  };

  useEffect(() => {
    setSubPage(searchParams.get('dialog'));
  }, [searchParams]);

  useEffect(() => {
    setIsLoggedIn(!!userData);
  }, [userData]);

  return (
    <ul className={`${styles.navSection} ${styles.navSectionUser}`}>
      {isLoggedIn ? (
        <>
          <li className={styles.navItem}>
            <NavLink
              activeClass={styles.navLinkActive}
              className={styles.navLink}
              href='/next-stores/favorites'
            >
              <Heart />
              <span className={styles.heartCount}>
                {userData?.favorites?.length ?? user?.favorites?.length ?? 0}
              </span>
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <button className={styles.navLink} onClick={logout}>
              <LogOut />
              {isLoggingOut ? <Spinner /> : <span>Logout</span>}
            </button>
          </li>
          <li className={styles.navItem}>
            <button
              className={styles.navLink}
              onClick={() => {
                setSubPage('account');
                router.replace(`${pathname}?dialog=account`);
              }}
            >
              {userData?.gravatar ? (
                <Image
                  className={styles.avatar}
                  alt='avatar'
                  src={userData?.gravatar ?? ''}
                  width={180}
                  height={180}
                />
              ) : (
                <>
                  <User />
                  <span>Account</span>
                </>
              )}
            </button>
          </li>
        </>
      ) : (
        <>
          <li className={styles.navItem}>
            <button
              className={styles.navLink}
              onClick={() => {
                setSubPage('register');
                router.replace(`${pathname}?dialog=register`);
              }}
            >
              <UserPlus />
              <span>Register</span>
            </button>
          </li>
          <li className={styles.navItem}>
            <button
              className={styles.navLink}
              onClick={() => {
                setSubPage('login');
                router.replace(`${pathname}?dialog=login`);
              }}
            >
              <LogIn />
              <span>Log In</span>
            </button>
          </li>
        </>
      )}
      {subPage && (
        <Portal>
          <Modal
            title={subPage[0].toUpperCase() + subPage.slice(1)}
            dismissText={`Dismiss ${
              subPage[0].toUpperCase() + subPage.slice(1)
            } Form`}
            dismiss={dismissSubPage}
          >
            {subPage === 'account' && (
              <EditAccountForm user={userData as IUser} />
            )}

            {subPage === 'reset-password' && (
              <ChangePasswordForm
                resetPassword
                title='Reset Password'
                resetToken={resetToken ?? ''}
              />
            )}

            {(subPage === 'register' || subPage === 'login') && (
              <Tabbed
                title='Authentication'
                tabs={[
                  {
                    label: 'Login',
                    value: 'login',
                    component: (
                      <>
                        <LoginForm endpoint='/api/next-stores/auth/login' />
                        <ForgotPassForm />
                      </>
                    ),
                  },
                  {
                    label: 'Register',
                    value: 'register',
                    component: <RegisterForm />,
                  },
                ]}
                defaultTab={subPage}
              />
            )}
          </Modal>
        </Portal>
      )}
    </ul>
  );
};

export default UserNav;
