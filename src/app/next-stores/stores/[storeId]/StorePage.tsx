import SingleStore from '@/components/next-stores/SingleStore';
import {getURL} from '@/utils/path';
import ErrorAlert from '@/components/ErrorAlert';

const Store = async ({params}: {params: {storeId: string}}) => {
  try {
    const res = await fetch(
      getURL(`/api/next-stores/stores/${params.storeId}`)
    );
    const json = await res.json();
    if (
      json?.status === 'error' &&
      json?.code === 500 &&
      /ENOTFOUND|timed out/.test(json?.message)
    ) {
      return (
        <ErrorAlert>
          <p>Couldn&apos;t connect to the server</p>
          <small>Check your internet connection</small>
        </ErrorAlert>
      );
    }
    if (json?.status === 'error') {
      throw new Error(json.message);
    }
    return <SingleStore store={json.data} />;
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
