import AutoCompleter from '@/components/AutoCompleter';
import PrettyDump from '@/components/PrettyDump';
import InteractiveMap from '@/components/next-stores/InteractiveMap';
import {getURL} from '@/utils/path';
import {Metadata} from 'next';
import styles from './MapPage.module.css';
import AddressAutoComplete from '@/components/next-stores/AddressAutoComplete';

interface MapPageProps {
  searchParams: {
    lng: string;
    lat: string;
  };
}

export const metadata: Metadata = {
  title: 'Map',
};

const MapPage = async ({searchParams}: MapPageProps) => {
  const {lng, lat} = searchParams;

  try {
    const res = await fetch(
      getURL(`/api/next-stores/stores/near?lng=${lng}&lat=${lat}`)
    );
    const stores = await res.json();
    return (
      <>
        <h1>Map</h1>
        <section className={styles.map}>
          <AddressAutoComplete
            name='geolocate'
            placeholder='Search for anything'
          />
          <InteractiveMap
            lng={+lng}
            lat={+lat}
            token={process.env.MAPBOX_PUBLIC_TOKEN!}
          />
        </section>
      </>
    );
  } catch (err) {
    console.log(err);
  }
};

export default MapPage;
