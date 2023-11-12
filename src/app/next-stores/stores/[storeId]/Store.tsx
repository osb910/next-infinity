import SingleStore from '@/components/next-stores/SingleStore';
import {getURL} from '@/utils/path';
import ErrorAlert from '@/components/ErrorAlert';

const Store = async ({params}: {params: {storeId: string}}) => {
  try {
    const res = await fetch(
      getURL(`/api/next-stores/stores/${params.storeId}`)
    );
    const store = await res.json();
    if (
      store?.status === 'error' &&
      store?.code === 500 &&
      /ENOTFOUND|timed out/.test(store?.message)
    ) {
      return (
        <ErrorAlert>
          <p>Couldn&apos;t connect to the server</p>
          <small>Check your internet connection</small>
        </ErrorAlert>
      );
    }
    if (store?.status === 'error') {
      throw new Error(store.message);
    }
    return <SingleStore store={store} />;
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
export default Store;
