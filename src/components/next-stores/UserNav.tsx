'use client';

import Image from 'next/image';
import {useRouter, useSearchParams, usePathname} from 'next/navigation';
import {useEffect, useState} from 'react';
import {User, UserPlus, LogIn, LogOut, Heart} from 'react-feather';
import * as Tabs from '@radix-ui/react-tabs';
import Cookies from 'js-cookie';
import Portal from '../Portal';
import Modal from '../Modal';
import styles from './UserNav.module.css';
import NavLink from './NavLink';
import {IUser} from '@/entities/next-stores/user/user.model';
import RegisterForm from '@/components/next-stores/RegisterForm';
import LoginForm from '@/components/next-stores/LoginForm';
import './styles.css';

interface UserNavProps {
  user: (IUser & {gravatar?: string; hearts?: any[]}) | null;
}

// export function NavigationEvents() {
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   useEffect(() => {
//     const url = `${pathname}?${searchParams}`;
//     console.log(url);
//     // You can now use the current URL
//     // ...
//   }, [pathname, searchParams]);

//   return null;
// }

const UserNav = ({user}: UserNavProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [authPage, setAuthPage] = useState<string | null>(() =>
    searchParams.get('auth-page')
  );

  const dismissAuthForm = () => {
    setAuthPage(null);
    router.replace(pathname);
  };

  const isLoggedIn = Cookies.get('next-stores-logged-in') === 'true';

  useEffect(() => {
    setAuthPage(searchParams.get('auth-page'));
  }, [searchParams]);

  return (
    <ul className={`${styles.navSection} ${styles.navSectionUser}`}>
      {user || isLoggedIn ? (
        <>
          <li className={styles.navItem}>
            <NavLink
              activeClassName={styles.navLinkActive}
              className={styles.navLink}
              href='/hearts'
            >
              <Heart />
              <span className={styles.heartCount}>
                {user?.hearts?.length ?? 0}
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
            <NavLink
              activeClassName={styles.navLinkActive}
              className={styles.navLink}
              href='/next-stores/account'
            >
              {user?.gravatar ? (
                <Image
                  className={styles.avatar}
                  alt='avatar'
                  src={user?.gravatar ?? ''}
                  width={200}
                  height={200}
                />
              ) : (
                <>
                  <User />
                  <span>Account</span>
                </>
              )}
            </NavLink>
          </li>
        </>
      ) : (
        <>
          <li className={styles.navItem}>
            <button
              className={styles.navLink}
              onClick={() => {
                setAuthPage('register');
                router.replace(`${pathname}?auth-page=register`);
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
                setAuthPage('login');
                router.replace(`${pathname}?auth-page=login`);
              }}
            >
              <LogIn />
              <span>Log In</span>
            </button>
          </li>
        </>
      )}
      {(authPage === 'register' || authPage === 'login') && (
        <Portal>
          <Modal
            title={authPage === 'register' ? 'Register' : 'Login'}
            dismissText={`Dismiss ${
              authPage === 'register' ? 'Register' : 'Login'
            } Form`}
            dismiss={dismissAuthForm}
          >
            <Tabs.Root className='TabsRoot' defaultValue={authPage}>
              <Tabs.List className='TabsList' aria-label='Authentication'>
                <Tabs.Trigger className='TabsTrigger' value='login'>
                  Login
                </Tabs.Trigger>
                <Tabs.Trigger className='TabsTrigger' value='register'>
                  Register
                </Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content className='TabsContent' value='login'>
                <LoginForm />
              </Tabs.Content>
              <Tabs.Content className='TabsContent' value='register'>
                <RegisterForm />
              </Tabs.Content>
            </Tabs.Root>
          </Modal>
        </Portal>
      )}
    </ul>
  );
};

{
  /* <Tabs.Root className='TabsRoot' defaultValue='tab1'>
  <Tabs.List className='TabsList' aria-label='Manage your account'>
    <Tabs.Trigger className='TabsTrigger' value='tab1'>
      Login
    </Tabs.Trigger>
    <Tabs.Trigger className='TabsTrigger' value='tab2'>
      Register
    </Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content className='TabsContent' value='tab1'>
    
  </Tabs.Content>
  <Tabs.Content className='TabsContent' value='tab2'>
    
  </Tabs.Content>
</Tabs.Root>; */
}

export default UserNav;
