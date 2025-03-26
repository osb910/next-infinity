import {headers} from 'next/headers';
import ErrorAlert from '@/components/ErrorAlert';
import Spinner from '@/ui/Spinner/Spinner';
import StoreEditor from '@/components/next-stores/StoreEditor';
import {getURL} from '@/utils/path';
import type {IStoreWithReviews} from '@/services/next-stores/store';
import type {JsonRes} from '@/types';
import {type StorePg} from '../StorePage';

const EditStore: StorePg = async ({params}) => {
  try {
    const {storeParam} = await params;
    const userId = (await headers()).get('X-USER-ID');
    const res = await fetch(getURL(`/api/next-stores/stores/${storeParam}`));
    const json = (await res.json()) as JsonRes<
      IStoreWithReviews & {
        author: string;
      }
    >;
    if (json.status === 'error') throw new Error(json.message);

    if (json.data?.author !== userId) {
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
