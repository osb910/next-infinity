import StoreCard from '@/components/next-stores/StoreCard';
import AddressAutoComplete from '@/components/next-stores/AddressAutoComplete';
import ErrorAlert from '@/components/ErrorAlert';
import InteractiveMap from '@/ui/InteractiveMap';
import {getURL} from '@/utils/path';
import {type IStore} from '@/services/next-stores/store';
import {type IReview} from '@/services/next-stores/review';
import {type Metadata} from 'next';
import styles from './MapPage.module.css';

export const metadata: Metadata = {
  title: 'Map | Next Stores',
  description: 'Find stores near you or anywhere in the world',
};

export interface MapPageProps {
  searchParams: {lng: string; lat: string; selected: string};
}

const MapPage = async ({searchParams}: MapPageProps) => {
  const {lng, lat, selected} = searchParams;
  try {
    const res = await fetch(
      getURL(`/api/next-stores/stores/near?lng=${lng}&lat=${lat}`)
    );
    const json = (await res.json()) as {
      status: string;
      code: number;
      message: string;
      data: Array<IStore & {reviews: Array<IReview>}>;
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
