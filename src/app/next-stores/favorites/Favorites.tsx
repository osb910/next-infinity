import {headers} from 'next/headers';
import ky from 'ky';
import {getURL} from '@/utils/path';
import Stores from '@/components/next-stores/Stores';

const Favorites = async () => {
  const headersStore = headers();
  const userId = headersStore.get('X-USER-ID') ?? '';
  const {data: user} = (await ky
    .get(getURL('/api/next-stores/users/me?populateFavorites=true'), {
      headers: {
        'X-USER-ID': userId ?? '',
      },
      cache: 'no-store',
    })
    .json()) as {data: any};

  return (
    <>
      <h1>Favorite Stores</h1>
      <Stores
        stores={user.favorites}
        userId={userId}
        count={user.favorites.length}
        page={1}
        pages={1}
        paginate={false}
      />
    </>
  );
};

export default Favorites;
