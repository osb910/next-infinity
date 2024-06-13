import {cache} from 'react';
import dynamic from 'next/dynamic';
import StoreCard from '@/components/next-stores/StoreCard';
import AddressAutoComplete from '@/components/next-stores/AddressAutoComplete';
import ErrorAlert from '@/components/ErrorAlert';
// import InteractiveMap from '@/ui/InteractiveMap';
import {getURL} from '@/utils/path';
import {type IStoreWithReviews} from '@/services/next-stores/store';
import type {AppPage, GeoLocation, GetMetadata, JsonRes} from '@/types';
import Spinner from '@/ui/Spinner';
import styles from './MapPage.module.css';

const InteractiveMap = dynamic(() => import('@/ui/InteractiveMap'), {
  loading: () => <Spinner />,
  ssr: false,
});

type SearchParams = {lng: string; lat: string; selected: string};
type MapPg = AppPage<{}, SearchParams>;

const fetcher = cache(async ({lng, lat}: {lng: string; lat: string}) => {
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
});

const getPageLocation = async ({lng, lat}: {lng: string; lat: string}) => {
  const pgLocationRes = await fetch(
    getURL(`/api/geocode/reverse?lng=${lng}&lat=${lat}`),
    {
      cache: 'no-store',
      headers: {
        'User-Agent': '*',
        Accept: 'application/json, text/plain, */*',
      },
    }
  );
  const pgLocationJson = await pgLocationRes.json();
  return pgLocationJson.features;
};

// export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const generateMetadata: GetMetadata<MapPg> = async ({
  searchParams: {lng, lat},
}) => {
  const [json, pgLocationJson] = await Promise.all([
    fetcher({lng, lat}),
    getPageLocation({lng, lat}),
  ]);
  let title;
  if (json?.status === 'error') {
    title = 'Map';
  } else {
    const region = json.data?.userLocation?.region;
    title = pgLocationJson
      ? `Map - ${pgLocationJson[0].properties.address.state}`
      : `Map${!lng && !lat && region ? ` - ${region}` : ''}`;
  }

  return {
    title,
    description: 'Find stores near you or anywhere in the world',
  };
};

const MapPage: MapPg = async ({searchParams: {lng, lat, selected}}) => {
  try {
    const json = await fetcher({lng, lat});

    if (json?.status === 'error') {
      throw new Error(json.message);
    }

    const locations =
      json?.data?.stores?.map((store) => ({
        lng: store.location.coordinates[0],
        lat: store.location.coordinates[1],
        id: store._id?.toString() ?? '',
        title: store.name,
      })) ?? [];

    const selectedItem = json?.data?.stores?.find(
      (store) => store._id?.toString() === selected
    );

    const mapStyle: Record<string, any> = {
      '--bg-img': `linear-gradient(
        to right,
        hsla(54, 82%, 78%, 0.7) 0% 15%,
        hsla(32, 58%, 36%, 0.7) 20% 35%,
        hsla(54, 82%, 78%, 0.7) 45% 55%,
        hsla(32, 58%, 36%, 0.7) 65% 80%,
        hsla(54, 82%, 78%, 0.7) 85% 100%
      )`,
    };

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
            useLiveLocation
            fixDefaultLocation
            style={mapStyle}
            buttonStyle={{'--bg': 'rgba(144, 94, 38, 0.67)'}}
          >
            {selectedItem && (
              <StoreCard
                item={selectedItem}
                userId=''
              />
            )}
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
