'use client';

import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactElement,
  type ReactNode,
} from 'react';
import Cookies from 'js-cookie';

export type User = {
  bookmarks: Array<string>;
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
}): ReactElement => {
  const userId = Cookies.get(userIdCookie);
  const [userData, setUserData] = useState<User | null>(null);

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
        if (json.status === 'success') {
          setUserData(json.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getUser();
  }, [userId, userData, userEndpoint]);

  const toggleBookmark = (bookmark: string) => {
    if (!userData?.bookmarks) return;
    const isBookmarked = userData.bookmarks.includes(bookmark);
    const newBookmarks = isBookmarked
      ? userData.bookmarks.filter((f: string) => f !== bookmark)
      : [...userData.bookmarks, bookmark];
    setUserData((current: User | null) => ({
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
