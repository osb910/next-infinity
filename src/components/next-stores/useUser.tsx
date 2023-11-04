'use client';

import {IUser} from '@/entities/next-stores/user/user.model';
import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import Cookies from 'js-cookie';

export type User = Omit<IUser, 'password'>;

interface UserContextProps {
  userData: User | null;
  setUserData: (userData: any) => void;
  toggleFavorite: (favorite: string) => void;
}

const UserContext = createContext<UserContextProps>({
  userData: null,
  setUserData: () => {},
  toggleFavorite: () => {},
});

export const UserProvider = ({
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
            'X-USER-ID': userId,
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

  const toggleFavorite = (favorite: string) => {
    if (!userData) return;
    const isFavored = userData.favorites.includes(favorite);
    const newFavorites = isFavored
      ? userData.favorites.filter((f: string) => f !== favorite)
      : [...userData.favorites, favorite];
    setUserData((current: User) => ({
      ...current,
      favorites: newFavorites,
    }));
  };

  return (
    <UserContext.Provider value={{userData, setUserData, toggleFavorite}}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const data = useContext(UserContext);

  if (!data)
    throw new Error('Cannot consume User context without a UserProvider');

  return data;
};

export default useUser;
