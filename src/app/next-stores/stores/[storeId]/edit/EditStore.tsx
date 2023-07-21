import ErrorAlert from '@/components/ErrorAlert';
import Spinner from '@/components/Spinner/Spinner';
import StoreEditor from '@/components/next-stores/StoreEditor';
import Store, {IStore} from '@/entities/next-stores/store/store.model';
import styles from './EditStore.module.css';

const EditStore = async ({params}: {params: {storeId: string}}) => {
  try {
    const _store = (await Store.findById(params.storeId)) as IStore & {
      _doc: IStore;
    };
    if (!_store) return <Spinner />;
    const store = {..._store._doc, _id: _store._id!.toString()};
    return (
      <>
        <h1 className={styles.title}>Edit {store.name}</h1>
        <StoreEditor store={store} />
      </>
    );
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err);
    return (
      <ErrorAlert>
        <p>Something went wrong</p>
        <small>{err.message}</small>
      </ErrorAlert>
    );
  }
};

export default EditStore;
