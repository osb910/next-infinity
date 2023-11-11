'use client';

import {fromLonLat} from 'ol/proj';
import {Point} from 'ol/geom';
import {RMap, ROSM, RLayerVector, RFeature, ROverlay, RStyle} from 'rlayers';
import 'ol/ol.css';
// import {MapPin} from 'react-feather';
import styles from './InteractiveMap.module.css';
import {getCoords} from '@/utils/numbers';

interface InteractiveMapProps {
  lng: number;
  lat: number;
  className?: string;
}

const InteractiveMap = ({lng, lat, className}: InteractiveMapProps) => {
  if (!lng || !lat) {
    console.log('lng or lat is not defined');
  }

  const userLocation = getCoords();

  return (
    <figure className={className ?? ''}>
      <RMap
        className={`${styles.map}`}
        initial={{
          center: fromLonLat(
            lng && lat
              ? [lng, lat]
              : [+userLocation?.lng! ?? 0, +userLocation?.lat! ?? 0]
          ),
          zoom: 12,
        }}
      >
        <ROSM />
        <RLayerVector zIndex={12}>
          <RStyle.RStyle>
            <RStyle.RIcon
              color={[0, 0, 255, 0.8]}
              size={[32, 32]}
              src={'/img/icons/marker.svg'}
              anchor={[0.5, 0.8]}
            />
          </RStyle.RStyle>
          <RFeature
            geometry={new Point(fromLonLat([lng, lat]))}
            onClick={(e: any) =>
              e.map.getView().fit(e.target.getGeometry().getExtent(), {
                duration: 250,
                maxZoom: 15,
              })
            }
          ></RFeature>
        </RLayerVector>
      </RMap>
    </figure>
  );
};

export default InteractiveMap;
