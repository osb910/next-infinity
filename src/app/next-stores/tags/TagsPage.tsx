import {headers} from 'next/headers';
import TagsCrumbs from '@/components/next-stores/TagsCrumbs';
import Store, {IStore} from '@/services/next-stores/store';
import styles from './Tags.module.css';
import {connectDB} from '@/lib/database';
import Stores from '@/components/next-stores/Stores';
import {getURL} from '@/utils/path';
import {IReview} from '@/services/next-stores/review/review.types';
import {P8n} from '@/types';

interface TagsProps {
  searchParams: {
    tag: string;
    p: string;
  };
}

const Tags = async ({searchParams: {tag, p}}: TagsProps) => {
  const userId = headers().get('X-USER-ID') ?? '';
  try {
    const tagsPromise = Store.getTagsList();
    const storesPromise = fetch(
      getURL(`/api/next-stores/stores?tag=${tag}&p=${p}`)
    );

    const [tags, res] = await Promise.all([tagsPromise, storesPromise]);
    const json = (await res.json()) as {
      status: string;
      message: string;
      data: Array<IStore & {reviews: Array<IReview>}>;
    } & P8n;

    return (
      <>
        <h1 className={styles.title}>{tag ?? 'Tags'}</h1>
        <TagsCrumbs active={tag} tags={tags} />
        <Stores
          stores={json.data}
          userId={userId}
          count={json.count}
          page={json.page}
          pages={json.pages}
        />
      </>
    );
  } catch (err) {
    console.log(err);
  }
};
export default Tags;
