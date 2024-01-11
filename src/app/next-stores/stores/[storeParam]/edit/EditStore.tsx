import {headers} from 'next/headers';
import ErrorAlert from '@/components/ErrorAlert';
import Spinner from '@/ui/Spinner/Spinner';
import StoreEditor from '@/components/next-stores/StoreEditor';
import {getURL} from '@/utils/path';
import type {IStore} from '@/services/next-stores/store';
import type {IReview} from '@/services/next-stores/review';
import styles from './EditStore.module.css';
import type {PageProps} from '@/types';

const EditStore = async ({params: {storeParam}}: PageProps) => {
  const headerList = headers();
  const userId = headerList.get('X-USER-ID');
  try {
    const res = await fetch(getURL(`/api/next-stores/stores/${storeParam}`));
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
    return <StoreEditor store={json.data} />;
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
