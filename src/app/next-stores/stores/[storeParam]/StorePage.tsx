import SingleStore from '@/components/next-stores/SingleStore';
import {getURL} from '@/utils/path';
import ErrorAlert from '@/components/ErrorAlert';
import type {Metadata, ResolvingMetadata} from 'next';
import type {PageProps} from '@/types';

export const generateMetadata = async (
  {params: {storeParam}}: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const res = await fetch(getURL(`/api/next-stores/stores/${storeParam}`));
  const json = await res.json();
  console.log(json);
  const metadata: Metadata =
    json?.status === 'error'
      ? {
          title: 'Error | Next Stores',
          description: json.message,
        }
      : {
          title: `${json.data.name} | Next Stores`,
          description: `${json.data.description}`,
        };
  const previous = await parent;
  console.log(previous);
  return metadata;
};

const Store = async ({params: {storeParam}}: PageProps) => {
  try {
    const res = await fetch(getURL(`/api/next-stores/stores/${storeParam}`));
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
