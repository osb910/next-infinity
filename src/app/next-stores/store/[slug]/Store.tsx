import ErrorAlert from '@/components/ErrorAlert';
import PrettyDump from '@/components/PrettyDump';
import SingleStore from '@/components/next-stores/SingleStore';
import {getURL} from '@/utils/path';

// export const dynamic = 'force-dynamic';

const Store = async ({params}: {params: {slug: string}}) => {
  try {
    const store = await fetch(getURL(`/api/next-stores/store/${params.slug}`));
    const data = await store.json();
    return <SingleStore store={data} />;
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
