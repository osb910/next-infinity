'use client';

import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {
  useState,
  useEffect,
  useCallback,
  type ComponentProps,
  type ReactNode,
} from 'react';
import {fromLonLat, toLonLat} from 'ol/proj';
import {Point} from 'ol/geom';
import {boundingExtent, getCenter} from 'ol/extent';
import {
  RMap,
  ROSM,
  RLayerVector,
  RFeature,
  ROverlay,
  RStyle,
  RControl,
  type RFeatureUIEvent,
} from 'rlayers';
import Spinner from '@/ui/Spinner';
import {getCoords} from '@/utils/numbers';
import {IS_SERVER} from '@/utils/path';
import {type MapBrowserEvent} from 'ol';
import {type RView} from 'rlayers/RMap';
import type {GeoLocation} from '@/types';
import 'rlayers/control/layers.css';
import 'ol/ol.css';
import styles from './InteractiveMap.module.css';

export interface InteractiveMapProps extends ComponentProps<'figure'> {
  locations: Array<{lng: number; lat: number; id: string}>;
  userLocation?: GeoLocation;
  height?: string;
  children?: ReactNode;
  items?: Array<any>;
  useSelection?: boolean;
  useAttribution?: boolean;
  useScaleLine?: boolean;
  useZoom?: boolean;
  useZoomSlider?: boolean;
  useFullScreen?: boolean;
  useCenterBtn?: boolean;
}

const InteractiveMap = ({
  locations,
  userLocation,
  height,
  items,
  children,
  useSelection = false,
  useAttribution = true,
  useScaleLine = true,
  useZoom = true,
  useZoomSlider = true,
  useFullScreen = true,
  useCenterBtn = true,
  ...delegated
}: InteractiveMapProps) => {
  const [first, ...rest] = locations;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const getOrigin = useCallback(() => {
    let coords = [first?.lng, first?.lat];
    if (!first?.lng && !first?.lat) {
      const userCoords = getCoords();
      coords = [
        userLocation?.longitude ?? userCoords?.lng ?? 0,
        userLocation?.latitude ?? userCoords?.lat ?? 0,
      ];
    }
    return coords;
  }, [first?.lng, userLocation?.longitude, first?.lat, userLocation?.latitude]);
  const [loc, setLoc] = useState(getOrigin);
  console.log({loc, userLocation});
  const extent = boundingExtent(
    locations.map(({lng, lat}) => fromLonLat([lng, lat]))
  );
  const center = locations.length ? getCenter(extent) : fromLonLat(loc);
  const initial: RView = {
    center,
    zoom: 13,
  };
  const [view, setView] = useState(initial);
  const [isLoading, setIsLoading] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [domLoaded, setDomLoaded] = useState(false);

  const selectItem = (itemId: string) => {
    if (!itemId || !useSelection) return;
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set('selected', itemId);
    const search = current.toString();
    router.push(`${pathname}${search ? `?${search}` : ''}`);
    router.refresh();
  };

  useEffect(() => {
    setDomLoaded(true);
    const newLoc = getOrigin();
    setLoc(newLoc);
    const center = locations.length ? getCenter(extent) : fromLonLat(newLoc);
    setView({center, zoom: 13});
  }, []);

  useEffect(() => {
    if (!domLoaded) return;
    const userCoords = getCoords();
    console.log(
      Math.abs(userLocation?.longitude ?? 0 - (userCoords?.lng ?? 0))
    );
    console.log(
      Math.abs((userLocation?.latitude ?? 0) - (userCoords?.lat ?? 0))
    );
    if (
      Math.abs(userLocation?.longitude ?? 0 - (userCoords?.lng ?? 0)) >= 1.5 &&
      Math.abs((userLocation?.latitude ?? 0) - (userCoords?.lat ?? 0)) >= 1.5
    ) {
      console.log('far server location');
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      current.set('lng', `${userCoords?.lng ?? 0}`);
      current.set('lat', `${userCoords?.lat ?? 0}`);
      const search = current.toString();
      router.push(`${pathname}${search ? `?${search}` : ''}`);
      router.refresh();
    }
  }, [domLoaded]);

  const changeView = useCallback((evt: MapBrowserEvent<UIEvent>) => {
    const coords = evt.map.getCoordinateFromPixel(evt.pixel);
    const lonlat = toLonLat(coords);
    setLoc(lonlat);
  }, []);

  useEffect(() => {
    const toggleFullScreen = () =>
      setIsFullScreen(!!document.fullscreenElement);

    document.addEventListener('fullscreenchange', toggleFullScreen);

    return () =>
      document.removeEventListener('fullscreenchange', toggleFullScreen);
  }, [height]);

  if (IS_SERVER) return null;

  const style: {[key: string]: string} = {
    '--height': isFullScreen ? '100vh' : height ?? '40vh',
  };

  return (
    <figure
      style={style}
      {...delegated}
      className={`${styles.wrapper} ${delegated.className ?? ''}`}
      id='interactive-map'
    >
      {(!!isLoading || !domLoaded) && (
        <div className={styles.loader}>
          <Spinner size={36} />
        </div>
      )}
      {domLoaded && (
        <RMap
          className={styles.map}
          initial={initial}
          view={[view, setView]}
          noDefaultControls
          // extent={extent}
          // onClick={changeView}
        >
          <ROSM
          // onTileLoadStart={evt => {
          //   evt.stopPropagation();
          //   console.log('onTileLoadStart', evt);
          //   setIsLoading(current => current + 1);
          // }}
          // onTileLoadEnd={evt => {
          //   evt.stopPropagation();

          //   console.log('onTileLoadEnd', evt);
          //   setIsLoading(current => current - 1);
          // }}
          />
          {(useAttribution || isFullScreen) && <RControl.RAttribution />}
          {(useScaleLine || isFullScreen) && <RControl.RScaleLine />}
          {(useZoom || isFullScreen) && <RControl.RZoom />}
          {(useZoomSlider || isFullScreen) && <RControl.RZoomSlider />}
          {(useFullScreen || isFullScreen) && (
            <RControl.RFullScreen
              className={styles.fullscreenToggler}
              source='interactive-map'
              label='&#x6269;'
              labelActive='&#x564f;'
            />
          )}
          {(useCenterBtn || isFullScreen) && (
            <RControl.RCustom className={styles.centerBtn}>
              <button onClick={(evt: any) => setView({...view, center})}>
                o
              </button>
            </RControl.RCustom>
          )}
          <RLayerVector zIndex={12}>
            <RStyle.RStyle>
              <RStyle.RIcon
                color={'rgba(30, 30, 220, 0.9)'}
                size={[40, 40]}
                src={'/img/icons/marker.svg'}
                anchor={[0.5, 0.8]}
              />
            </RStyle.RStyle>
            <RFeature
              geometry={new Point(fromLonLat(loc))}
              onClick={(evt: RFeatureUIEvent) => {
                console.log(evt);
                evt.map.getView().fit(evt.target.getGeometry()!.getExtent(), {
                  duration: 300,
                  maxZoom: 16,
                });
                selectItem(first?.id ?? '');
              }}
              key={'marker-1'}
            >
              {/* {items &&
              ItemComponent &&
              selectedItem?._id === items?.[0]?._id && (
                <ROverlay className={styles.overlay}>
                  <ItemComponent item={items[0] ?? {}} />
                </ROverlay>
              )} */}
            </RFeature>
            {rest?.map(({lng, lat, id}, i) => (
              <RFeature
                geometry={new Point(fromLonLat([lng, lat]))}
                onClick={(evt: RFeatureUIEvent) => {
                  evt.map.getView().fit(evt.target.getGeometry()!.getExtent(), {
                    duration: 300,
                    maxZoom: 16,
                  });
                  selectItem(id ?? '');
                }}
                key={`marker-${i + 2}`}
              ></RFeature>
            ))}
          </RLayerVector>
        </RMap>
      )}
      {children}
    </figure>
  );
};

export default InteractiveMap;
