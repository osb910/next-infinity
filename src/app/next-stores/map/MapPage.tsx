import StoreCard from '@/components/next-stores/StoreCard';
import AddressAutoComplete from '@/components/next-stores/AddressAutoComplete';
import ErrorAlert from '@/components/ErrorAlert';
import InteractiveMap from '@/ui/InteractiveMap';
import {getURL} from '@/utils/path';
import {type Metadata} from 'next';
import {type IStoreWithReviews} from '@/services/next-stores/store';
import type {AppPage, JsonRes} from '@/types';
import styles from './MapPage.module.css';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Map',
  description: 'Find stores near you or anywhere in the world',
};

type SearchParams = {lng: string; lat: string; selected: string};

const MapPage: AppPage<{}, SearchParams> = async ({
  searchParams: {lng, lat, selected},
}) => {
  try {
    const res = await fetch(
      getURL(
        `/api/next-stores/stores/near?lng=${lng}&lat=${lat}&max-distance=14000`
      )
    );
    const json = (await res.json()) as JsonRes<{
      stores: Array<IStoreWithReviews>;
      userLocation: any;
    }>;
    if (json?.status === 'error') {
      throw new Error(json.message);
    }
    const locations =
      json?.data?.stores?.map(store => ({
        lng: store.location.coordinates[0],
        lat: store.location.coordinates[1],
        id: store._id,
      })) ?? [];

    const selectedItem = json?.data?.stores?.find(
      store => store._id === selected
    );

    return (
      <>
        <h1>Map</h1>
        <section className={styles.wrapper}>
          <AddressAutoComplete
            name='geolocate'
            placeholder='Search for anywhere'
          />
          <InteractiveMap
            userLocation={json?.data?.userLocation}
            locations={locations}
            height='60vh'
            items={json?.data?.stores ?? []}
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
