import {cache} from 'react';
import {type IStoreWithReviews} from '@/services/next-stores/store';
import SingleStore from '@/components/next-stores/SingleStore';
import ErrorAlert from '@/components/ErrorAlert';
import {getURL} from '@/utils/path';
import type {AppPage, GetMetadata, JsonRes} from '@/types';
import {Metadata} from 'next';

export type StorePg = AppPage<{storeParam: string}>;
export type StoreGenMetadata = GetMetadata<{storeParam: string}>;

export const revalidate = 60 * 60 * 12;

const fetcher = cache(async (param: string) => {
  const res = await fetch(getURL(`/api/next-stores/stores/${param}`));
  const json = (await res.json()) as JsonRes<IStoreWithReviews>;
  return json;
});

export const generateMetadata: StoreGenMetadata = async ({params}) => {
  const {storeParam} = await params;
  const json = await fetcher(storeParam);
  const metadata: Metadata =
    json?.status === 'error'
      ? {
          title: 'Store',
        }
      : {
          title: json.data?.name,
          description: json.data?.description,
          openGraph: {
            title: json.data?.name,
            description: json.data?.description,
            images: [
              {
                url: `/api/next-stores/files/${json.data?.photo?.key}`,
                width: 800,
                height: 600,
                alt: json.data?.name,
              },
            ],
          },
          twitter: {
            title: json.data?.name,
            description: json.data?.description,
            images: [`/api/next-stores/files/${json.data?.photo?.key}`],
          },
        };
  return metadata;
};

const StorePage: StorePg = async ({params}) => {
  const {storeParam} = await params;
  try {
    const json = await fetcher(storeParam);
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

// export async function generateStaticParams() {
//   const stores = await Store.find({slug: {$exists: true}}, 'slug');
//   console.log('generateStaticParams', stores);
//   return stores.map(store => ({
//     storeParam: store.slug,
//   }));
// }

export default StorePage;
