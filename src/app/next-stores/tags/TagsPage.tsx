import StoreCard from '@/components/next-stores/StoreCard';
import TagsCrumbs from '@/components/next-stores/TagsCrumbs';
import Store, {IStore} from '@/models/next-stores/store/store.model';
import styles from './Tags.module.css';
import {connectDB} from '@/lib/database';
import Stores from '@/components/next-stores/Stores';

interface TagsProps {
  searchParams: {
    tag: string;
  };
}

const Tags = async ({searchParams: {tag}}: TagsProps) => {
  try {
    await connectDB();
    // @ts-ignore
    const tagsPromise = Store.getTagsList();
    const storesPromise = Store.find({tags: tag ?? {$exists: true}});

    const [tags, stores] = await Promise.all([tagsPromise, storesPromise]);

    return (
      <>
        <h1 className={styles.title}>{tag ?? 'Tags'}</h1>
        <TagsCrumbs active={tag} tags={tags} />
        <Stores stores={stores} />
      </>
    );
  } catch (err) {
    console.log(err);
  }
};
export default Tags;
