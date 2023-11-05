import {headers} from 'next/headers';
import ErrorAlert from '@/components/ErrorAlert';
import Spinner from '@/components/Spinner/Spinner';
import StoreEditor from '@/components/next-stores/StoreEditor';
import styles from './EditStore.module.css';
import {getURL} from '@/utils/path';
import {IStore} from '@/entities/next-stores/store/store.model';

const EditStore = async ({params}: {params: {storeId: string}}) => {
  const headerList = headers();
  const userId = headerList.get('X-USER-ID');
  try {
    const res = await fetch(
      getURL(`/api/next-stores/stores/${params.storeId}`)
    );
    const data = (await res.json()) as IStore & {
      message?: string;
      status?: string;
    };
    console.log({author: data.author.toString(), userId});
    if (data.author.toString() !== userId) {
      return (
        <ErrorAlert>
          <p>You are not the owner of this store!</p>
        </ErrorAlert>
      );
    }
    if (!data) return <Spinner />;
    const store = {...data, _id: data._id};
    return (
      <>
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
