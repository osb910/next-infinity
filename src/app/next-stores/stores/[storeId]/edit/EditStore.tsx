import ErrorAlert from '@/components/ErrorAlert';
import Spinner from '@/components/Spinner/Spinner';
import StoreEditor from '@/components/next-stores/StoreEditor';
import styles from './EditStore.module.css';
import {getURL} from '@/utils/path';

const EditStore = async ({params}: {params: {storeId: string}}) => {
  try {
    const res = await fetch(
      getURL(`/api/next-stores/stores/${params.storeId}`),
      {cache: 'no-store'}
    );
    const data = await res.json();
    console.log(data);
    if (!data) return <Spinner />;
    const store = {...data, _id: data._id};
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
