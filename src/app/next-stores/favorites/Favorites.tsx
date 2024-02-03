import {headers} from 'next/headers';
import ky from 'ky';
import {getURL} from '@/utils/path';
import Stores from '@/components/next-stores/Stores';
import type {JsonRes} from '@/types';
import {type IUser} from '@/services/next-stores/user';
import {IStoreWithReviews} from '@/services/next-stores/store';

const Favorites = async () => {
  const userId = headers().get('X-USER-ID') ?? '';
  const {data: user} = (await ky
    .get(getURL('/api/next-stores/auth/me?populateFavorites=true'), {
      headers: {
        'X-USER-ID': userId ?? '',
      },
      cache: 'no-store',
    })
    .json()) as JsonRes<
    Omit<IUser, 'favorites'> & {favorites: Array<IStoreWithReviews>}
  >;

  return (
    <>
      <h1>Favorite Stores</h1>
      <Stores
        stores={user?.favorites ?? []}
        userId={userId}
        count={user?.favorites?.length ?? 0}
        page={1}
        pages={1}
        paginate={false}
      />
    </>
  );
};

export default Favorites;
