import {headers} from 'next/headers';
import ErrorAlert from '@/components/ErrorAlert';
import Spinner from '@/components/Spinner/Spinner';
import StoreEditor from '@/components/next-stores/StoreEditor';
import styles from './EditStore.module.css';
import {getURL} from '@/utils/path';
import {IStore} from '@/models/next-stores/store/store.model';
import {IUser} from '@/models/next-stores/user/user.model';
import {IReview} from '@/models/next-stores/review/review.types';

const EditStore = async ({params}: {params: {storeId: string}}) => {
  const headerList = headers();
  const userId = headerList.get('X-USER-ID');
  try {
    const res = await fetch(
      getURL(`/api/next-stores/stores/${params.storeId}`)
    );
    const json = (await res.json()) as IStore & {
      message?: string;
      status?: string;
      data: IStore & {
        author: string;
      } & {reviews: Array<IReview>};
    };
    console.log(json.data);
    if (json.data.author !== userId) {
      return (
        <ErrorAlert>
          <p>You are not the owner of this store!</p>
        </ErrorAlert>
      );
    }
    if (!json) return <Spinner />;
    return (
      <>
        <StoreEditor store={json.data} />
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
