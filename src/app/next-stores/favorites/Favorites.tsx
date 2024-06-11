import {headers} from 'next/headers';
import ky from 'ky';
import {getURL} from '@/utils/path';
import Stores from '@/components/next-stores/Stores';
import type {JsonRes} from '@/types';
import {type IUser} from '@/services/next-stores/user';
import {IStoreWithReviews} from '@/services/next-stores/store';

const Favorites = async () => {
  try {
    const userId = headers().get('X-USER-ID') ?? '';
    const json = (await ky
      .get(getURL('/api/next-stores/auth/me?populateFavorites=true'), {
        headers: {
          'X-USER-ID': userId ?? '',
        },
        cache: 'no-store',
      })
      .json()) as JsonRes<
      Omit<IUser, 'favorites'> & {favorites: Array<IStoreWithReviews>}
    >;

    if (json.status === 'error') throw new Error(json.message);

    const {data: user} = json;

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
  } catch (err) {
    console.error(err);
  }
};

export default Favorites;
