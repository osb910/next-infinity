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
import Portal from '@/ui/Portal';
import Modal from '@/components/Modal';
import Spinner from '@/ui/Spinner';
import {type IUser} from '@/services/next-stores/user';
import styles from './UserNav.module.css';
import {NavItem, NavList, NavLink} from '@/ui/Nav';

const highlightStyle = {
  borderBlockEndColor: 'rgba(20, 20, 60, 0.4)',
  borderInlineEndColor: 'rgba(0, 0, 0, 0.15)',
  background: `linear-gradient(
    90deg,
    hsla(50, 82%, 78%, 0.8) 0% 8%,
    hsla(32, 68%, 45%, 0.8) 35% 65%,
    hsla(50, 82%, 78%, 0.8) 92% 100%
  )`,
};

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
  const [dialog, setSubPage] = useState<string | null>(() =>
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
    <NavList className={`${styles.navSection} ${styles.navSectionUser}`}>
      {isLoggedIn ? (
        <>
          <NavItem
            slug='/next-stores/favorites'
            className={styles.navItem}
            highlightStyle={highlightStyle}
          >
            <NavLink
              highlightStyle={highlightStyle}
              className={styles.navLink}
              href='/next-stores/favorites'
            >
              <Heart />
              <span className={styles.heartCount}>
                {userData?.favorites?.length ?? user?.favorites?.length ?? 0}
              </span>
            </NavLink>
          </NavItem>
          <NavItem
            slug='logout'
            className={styles.navItem}
            highlightStyle={highlightStyle}
          >
            <button className={styles.navLink} onClick={logout}>
              <LogOut />
              {isLoggingOut ? <Spinner /> : <span>Logout</span>}
            </button>
          </NavItem>
          <NavItem
            slug='account'
            className={styles.navItem}
            highlightStyle={highlightStyle}
          >
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
          </NavItem>
        </>
      ) : (
        <>
          <NavItem
            slug='register'
            className={styles.navItem}
            highlightStyle={highlightStyle}
          >
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
          </NavItem>
          <NavItem
            slug='login'
            className={styles.navItem}
            highlightStyle={highlightStyle}
          >
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
          </NavItem>
        </>
      )}
      {dialog && (
        <Portal>
          <Modal
            title={dialog[0].toUpperCase() + dialog.slice(1)}
            dismissText={`Dismiss ${
              dialog[0].toUpperCase() + dialog.slice(1)
            } Form`}
            dismiss={dismissSubPage}
          >
            {dialog === 'account' && (
              <EditAccountForm user={userData as IUser} />
            )}

            {dialog === 'reset-password' && (
              <ChangePasswordForm
                resetPassword
                title='Reset Password'
                resetToken={resetToken ?? ''}
              />
            )}

            {(dialog === 'register' || dialog === 'login') && (
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
                defaultTab={dialog}
              />
            )}
          </Modal>
        </Portal>
      )}
    </NavList>
  );
};

export default UserNav;
