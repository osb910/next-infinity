import {headers} from 'next/headers';
import ErrorAlert from '@/components/ErrorAlert';
import Spinner from '@/components/Spinner/Spinner';
import StoreEditor from '@/components/next-stores/StoreEditor';
import styles from './EditStore.module.css';
import {getURL} from '@/utils/path';
import {IStore} from '@/entities/next-stores/store/store.model';
import {IUser} from '@/entities/next-stores/user/user.model';
import {IReview} from '@/entities/next-stores/review/review.types';

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
        author: IUser;
      } & {reviews: Array<IReview>};
    };
    if (json.author._id.toString() !== userId) {
      return (
        <ErrorAlert>
          <p>You are not the owner of this store!</p>
        </ErrorAlert>
      );
    }
    if (!json) return <Spinner />;
    const store = {...json, _id: json._id};
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
