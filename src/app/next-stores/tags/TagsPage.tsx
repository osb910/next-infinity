import {headers} from 'next/headers';
import TagsCrumbs from '@/components/next-stores/TagsCrumbs';
import Store, {type IStoreWithReviews} from '@/services/next-stores/store';
import styles from './Tags.module.css';
import Stores from '@/components/next-stores/Stores';
import {getURL} from '@/utils/path';
import {AppPage, GetMetadata, JsonRes, P8n} from '@/types';

type TagsPg = AppPage<
  {},
  {
    tag: string;
    p: string;
  }
>;

export const generateMetadata: GetMetadata<TagsPg> = async (
  {searchParams: {tag}},
  parent
) => {
  return {
    title: tag ? `${tag} Stores` : 'Tags',
  };
};

const Tags: TagsPg = async ({searchParams: {tag, p}}) => {
  const userId = headers().get('X-USER-ID') ?? '';
  try {
    const tagsPromise = Store.getTagsList();
    const storesPromise = fetch(
      getURL(`/api/next-stores/stores?tag=${tag}&p=${p}&limit=9`)
    );

    const [tags, res] = await Promise.all([tagsPromise, storesPromise]);
    const json = (await res.json()) as JsonRes<Array<IStoreWithReviews>>;

    return (
      <>
        <h1 className={styles.title}>{tag ?? 'Tags'}</h1>
        <TagsCrumbs active={tag} tags={tags} />
        <Stores
          stores={json?.data ?? []}
          userId={userId}
          count={json?.count ?? 0}
          page={json?.page ?? 1}
          pages={json?.pages ?? 1}
        />
      </>
    );
  } catch (err) {
    console.log(err);
  }
};
export default Tags;
