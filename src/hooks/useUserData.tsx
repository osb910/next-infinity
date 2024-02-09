'use client';

import {
  useState,
  useEffect,
  createContext,
  useContext,
  type ReactNode,
} from 'react';
import Cookies from 'js-cookie';

export type User = {
  bookmarks?: Array<string>;
};

interface UserContextProps {
  userData: User | null;
  setUserData: (userData: User) => void;
  toggleBookmark: (bookmark: string) => void;
}

const UserContext = createContext<UserContextProps>({
  userData: null,
  setUserData: () => {},
  toggleBookmark: () => {},
});

export const UserDataProvider = ({
  userEndpoint,
  userIdCookie,
  children,
}: {
  userEndpoint: string;
  userIdCookie: string;
  children: ReactNode;
}): JSX.Element => {
  const userId = Cookies.get(userIdCookie);
  const [userData, setUserData] = useState<User | any>(null);

  useEffect(() => {
    if (userData || !userId) return;
    const getUser = async () => {
      try {
        const res = await fetch(userEndpoint, {
          headers: {
            'x-user-id': userId,
          },
          cache: 'no-store',
        });
        const json = await res.json();
        json.status === 'success' && setUserData(json.data);
      } catch (err) {
        console.error(err);
      }
    };
    getUser();
  }, [userId, userData, userEndpoint]);

  const toggleBookmark = (bookmark: string) => {
    if (!userData) return;
    const isBookmarked = userData.bookmarks.includes(bookmark);
    const newBookmarks = isBookmarked
      ? userData.bookmarks.filter((f: string) => f !== bookmark)
      : [...userData.bookmarks, bookmark];
    setUserData((current: User) => ({
      ...current,
      bookmarks: newBookmarks,
    }));
  };

  return (
    <UserContext.Provider value={{userData, setUserData, toggleBookmark}}>
      {children}
    </UserContext.Provider>
  );
};

const useUserData = () => {
  const data = useContext(UserContext);

  if (!data)
    throw new Error('Cannot consume User context without a UserDataProvider');

  return data;
};

export default useUserData;
