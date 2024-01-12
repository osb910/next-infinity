import StoreCard from '@/components/next-stores/StoreCard';
import AddressAutoComplete from '@/components/next-stores/AddressAutoComplete';
import ErrorAlert from '@/components/ErrorAlert';
import InteractiveMap from '@/ui/InteractiveMap';
import {getURL} from '@/utils/path';
import {type Metadata} from 'next';
import {type IStoreWithReviews} from '@/services/next-stores/store';
import type {PageProps} from '@/types';
import styles from './MapPage.module.css';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Map',
  description: 'Find stores near you or anywhere in the world',
};

const MapPage = async ({searchParams: {lng, lat, selected}}: PageProps) => {
  try {
    const res = await fetch(
      getURL(`/api/next-stores/stores/near?lng=${lng}&lat=${lat}`)
    );
    const json = (await res.json()) as {
      status: string;
      code: number;
      message: string;
      data: Array<IStoreWithReviews>;
    };
    if (json?.status === 'error') {
      throw new Error(json.message);
    }
    const locations =
      json?.data?.map(store => ({
        lng: store.location.coordinates[0],
        lat: store.location.coordinates[1],
        id: store._id,
      })) ?? [];

    const selectedItem = json?.data?.find(store => store._id === selected);

    return (
      <>
        <h1>Map</h1>
        <section className={styles.wrapper}>
          <AddressAutoComplete
            name='geolocate'
            placeholder='Search for anywhere'
          />
          <InteractiveMap
            locations={locations}
            height='60vh'
            items={json?.data ?? []}
          >
            {selectedItem && <StoreCard item={selectedItem} userId='' />}
          </InteractiveMap>
        </section>
      </>
    );
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.log(err);
    return (
      <ErrorAlert>
        <p>Something went wrong</p>
        <small>{err.message}</small>
      </ErrorAlert>
    );
  }
};

export default MapPage;
