import StoreCard from '@/components/next-stores/StoreCard';
import TagsCrumbs from '@/components/next-stores/TagsCrumbs';
import Store, {IStore} from '@/entities/next-stores/store/store.model';
import styles from './Tags.module.css';

interface TagsProps {
  searchParams: {
    tag: string;
  };
}

const Tags = async ({searchParams: {tag}}: TagsProps) => {
  // @ts-ignore
  const tagsPromise = Store.getTagsList();
  const storesPromise = Store.find({tags: tag ?? {$exists: true}});

  const [tags, stores] = await Promise.all([tagsPromise, storesPromise]);

  return (
    <>
      <h1 className={styles.title}>{tag ?? 'Tags'}</h1>
      <TagsCrumbs active={tag} tags={tags} />
      <ul className={styles.stores}>
        {stores.map((store: IStore) => (
          <StoreCard key={store?._id?.toString()} store={store} />
        ))}
      </ul>
    </>
  );
};
export default Tags;
