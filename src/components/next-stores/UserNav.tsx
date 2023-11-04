'use client';

import Image from 'next/image';
import {useRouter, useSearchParams, usePathname} from 'next/navigation';
import {useEffect, useState} from 'react';
import {User, UserPlus, LogIn, LogOut, Heart} from 'react-feather';
import Cookies from 'js-cookie';
import Portal from '../Portal';
import Modal from '../Modal';
import styles from './UserNav.module.css';
import NavLink from './NavLink';
import {IUser} from '@/entities/next-stores/user/user.model';
import RegisterForm from '@/components/next-stores/RegisterForm';
import LoginForm from '@/components/next-stores/LoginForm';
import Tabbed from '../Tabbed';
import EditAccountForm from './EditAccountForm';
import ForgotPassForm from './ForgotPassForm';
import ChangePasswordForm from './ChangePasswordForm';
import useUser from './useUser';

const UserNav = ({user}: {user: IUser | null}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [subPage, setSubPage] = useState<string | null>(() =>
    searchParams.get('sub-page')
  );
  const resetToken = searchParams.get('reset-token');
  const {userData} = useUser();
  const dismissSubPage = () => {
    setSubPage(null);
    router.replace(pathname);
  };

  const isLoggedIn = Cookies.get('next-stores-logged-in') === 'true';

  useEffect(() => {
    setSubPage(searchParams.get('sub-page'));
  }, [searchParams]);

  return (
    <ul className={`${styles.navSection} ${styles.navSectionUser}`}>
      {user || isLoggedIn ? (
        <>
          <li className={styles.navItem}>
            <NavLink
              activeClassName={styles.navLinkActive}
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
            <NavLink
              activeClassName={styles.navLinkActive}
              className={styles.navLink}
              href='/api/next-stores/auth/logout'
            >
              <LogOut />
              <span>Logout</span>
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <button
              className={styles.navLink}
              onClick={() => {
                setSubPage('account');
                router.replace(`${pathname}?sub-page=account`);
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
                router.replace(`${pathname}?sub-page=register`);
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
                router.replace(`${pathname}?sub-page=login`);
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
                        <LoginForm />
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
