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
import {
  RMap,
  ROSM,
  RLayerVector,
  RFeature,
  ROverlay,
  RStyle,
  RControl,
} from 'rlayers';
import {type MapBrowserEvent} from 'ol';
import {type RView} from 'rlayers/RMap';
import Spinner from '@/ui/Spinner';
import {getCoords} from '@/utils/numbers';
import {IS_SERVER} from '@/utils/path';
import 'rlayers/control/layers.css';
import 'ol/ol.css';
import styles from './InteractiveMap.module.css';

export interface InteractiveMapProps extends ComponentProps<'figure'> {
  locations: Array<{lng: number; lat: number; id: string}>;
  height?: string;
  children?: ReactNode;
  items?: Array<any>;
  useAttribution?: boolean;
  useScaleLine?: boolean;
  useZoom?: boolean;
  useZoomSlider?: boolean;
  useFullScreen?: boolean;
  useCenterBtn?: boolean;
}

const InteractiveMap = ({
  locations,
  height,
  items,
  children,
  useAttribution = true,
  useScaleLine = true,
  useZoom = true,
  useZoomSlider = true,
  useFullScreen = true,
  useCenterBtn = true,
  ...delegated
}: InteractiveMapProps) => {
  const userCoords = getCoords();
  const [first, ...rest] = locations;
  const origin = [
    first?.lng ?? userCoords?.lng ?? 0,
    first?.lat ?? userCoords?.lat ?? 0,
  ];
  const [loc, setLoc] = useState(origin);
  const initial: RView = {
    center: fromLonLat(origin),
    zoom: 12,
  };
  const [view, setView] = useState(initial);
  const [isLoading, setIsLoading] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectItem = (itemId: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set('selected', itemId);
    const search = current.toString();
    router.push(`${pathname}${search ? `?${search}` : ''}`);
  };

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
      <RMap
        className={styles.map}
        initial={initial}
        view={[view, setView]}
        noDefaultControls
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
            <button
              onClick={(evt: any) => {
                console.log(evt);
                setView({...view, center: fromLonLat(loc)});
              }}
            >
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
            onClick={(evt: any) => {
              evt.map.getView().fit(evt.target.getGeometry().getExtent(), {
                duration: 300,
                maxZoom: 15,
              });
              selectItem(first.id);
            }}
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
              onClick={(evt: any) => {
                evt.map.getView().fit(evt.target.getGeometry().getExtent(), {
                  duration: 300,
                  maxZoom: 15,
                });
                selectItem(id);
              }}
              key={`marker-${i + 2}`}
            ></RFeature>
          ))}
        </RLayerVector>
      </RMap>
      {!!isLoading && (
        <div className={styles.loader}>
          <Spinner size={36} />
        </div>
      )}
      {children}
    </figure>
  );
};

export default InteractiveMap;
