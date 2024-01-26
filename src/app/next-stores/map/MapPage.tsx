import StoreCard from '@/components/next-stores/StoreCard';
import AddressAutoComplete from '@/components/next-stores/AddressAutoComplete';
import ErrorAlert from '@/components/ErrorAlert';
import InteractiveMap from '@/ui/InteractiveMap';
import {getURL} from '@/utils/path';
import {type IStoreWithReviews} from '@/services/next-stores/store';
import type {AppPage, GeoLocation, GetMetadata, JsonRes} from '@/types';
import styles from './MapPage.module.css';

type SearchParams = {lng: string; lat: string; selected: string};
type MapPg = AppPage<{}, SearchParams>;

const fetcher = async ({lng, lat}: {lng: string; lat: string}) => {
  const res = await fetch(
    getURL(
      `/api/next-stores/stores/near?lng=${lng}&lat=${lat}&max-distance=12000`
    ),
    {
      // cache: 'no-store',
      next: {revalidate: 0},
    }
  );
  const json = (await res.json()) as JsonRes<{
    stores: Array<IStoreWithReviews>;
    userLocation: GeoLocation;
  }>;
  return json;
};

// export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const generateMetadata: GetMetadata<MapPg> = async ({
  searchParams: {lng, lat},
}) => {
  const pgLocationPromise = fetch(
    getURL(`/api/geocode/reverse?lng=${lng}&lat=${lat}`),
    {
      cache: 'no-store',
      headers: {
        'User-Agent': '*',
        Accept: 'application/json, text/plain, */*',
      },
    }
  );
  const [json, pgLocationRes] = await Promise.all([
    fetcher({lng, lat}),
    pgLocationPromise,
  ]);
  const pgLocationJson = await pgLocationRes.json();
  console.log({pgLocationJson});
  const region = json.data?.userLocation?.region;
  console.log(json.data?.userLocation);
  const title = pgLocationJson?.features
    ? `Map - ${pgLocationJson.features[0].properties.address.state}`
    : `Map${!lng && !lat && region ? ` - ${region}` : ''}`;

  return {
    title,
    description: 'Find stores near you or anywhere in the world',
  };
};

const MapPage: MapPg = async ({searchParams: {lng, lat, selected}}) => {
  try {
    const json = await fetcher({lng, lat});
    console.log(json.data?.userLocation);

    if (json?.status === 'error') {
      throw new Error(json.message);
    }

    const locations =
      json?.data?.stores?.map(store => ({
        lng: store.location.coordinates[0],
        lat: store.location.coordinates[1],
        id: store._id,
        title: store.name,
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
            locations={locations}
            userLocation={json?.data?.userLocation}
            height='60vh'
            items={json?.data?.stores ?? []}
            useSelection
            useAttribution
            useZoomSlider
            useScaleLine
            fixDefaultLocation
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
