'use client';

import ReactMapboxGl, {Layer, Feature, Image} from 'react-mapbox-gl';
import {Marker} from 'react-mapbox-gl';
import {MapPin} from 'react-feather';

import 'mapbox-gl/dist/mapbox-gl.css';
import styles from './InteractiveMap.module.css';
import {getURL} from '@/utils/path';

interface InteractiveMapProps {
  lng: number;
  lat: number;
  token: string;
}

const InteractiveMap = ({lng, lat, token}: InteractiveMapProps) => {
  const Map = ReactMapboxGl({
    accessToken: token,
  });

  return (
    <figure className={styles.map}>
      <Map
        style='mapbox://styles/mapbox/streets-v12'
        containerStyle={{
          height: '16rem',
          // width: 'calc(100% + 6rem)',
        }}
        className={styles.map}
      >
        <Layer type='symbol' id='marker' layout={{'icon-image': 'map-marker'}}>
          <Feature coordinates={[lng, lat]} />
        </Layer>
        <Image
          id={'map-marker'}
          url={'/img/icons/map-pin.svg'}
          // url={'/api/next-stores/files/map-pin.svg'}
          alt=''
        />
        {/* <Marker coordinates={[lng, lat]} anchor='bottom'>
          <MapPin size={20} color='#fff' />
        </Marker> */}
      </Map>
    </figure>
  );
};

export default InteractiveMap;
