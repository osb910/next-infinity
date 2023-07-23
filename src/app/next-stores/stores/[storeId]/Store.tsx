import ErrorAlert from '@/components/ErrorAlert';
import PrettyDump from '@/components/PrettyDump';
import {getURL} from '@/utils/path';
import {NextResponse} from 'next/server';

const Store = async ({params}: {params: {storeId: string}}) => {
  try {
    const store = await fetch(
      getURL(`/api/next-stores/stores/${params.storeId}`)
    );
    const data = await store.json();
    NextResponse.json(data);
    return <PrettyDump data={data} />;
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
