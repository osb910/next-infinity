'use client';

import {
  useState,
  useEffect,
  useCallback,
  useRef,
  type ComponentProps,
  type ReactNode,
  type MouseEvent,
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
  RPopup,
} from 'rlayers';
import {FaLocationCrosshairs} from 'react-icons/fa6';
import {MdCenterFocusWeak} from 'react-icons/md';
import {BsArrowsFullscreen} from 'react-icons/bs';
import {AiOutlineFullscreenExit} from 'react-icons/ai';
import {TbLiveView} from 'react-icons/tb';
import useRedirect from '@/hooks/useRedirect';
import Spinner from '@/ui/Spinner';
import {getCoords} from '@/utils/numbers';
import {IS_SERVER} from '@/utils/path';
import {type MapBrowserEvent} from 'ol';
import {type RView} from 'rlayers/RMap';
import type {GeoLocation} from '@/types';
import 'rlayers/control/layers.css';
import 'ol/ol.css';
import styles from './InteractiveMap.module.css';
import useFullscreen from '@/hooks/useFullscreen';
import {Coordinate} from 'ol/coordinate';
import {delay} from '@/utils/promises';
import IconButton from '@/components/IconButton';

export interface InteractiveMapProps extends ComponentProps<'figure'> {
  locations: Array<{lng: number; lat: number; id: string; title?: string}>;
  userLocation?: GeoLocation;
  height?: string;
  children?: ReactNode;
  items?: Array<any>;
  fixDefaultLocation?: boolean;
  useSelection?: boolean;
  useAttribution?: boolean;
  useScaleLine?: boolean;
  useZoom?: boolean;
  useZoomSlider?: boolean;
  useLiveLocation?: boolean;
  useFullscreenBtn?: boolean;
  useCenterBtn?: boolean;
}

const InteractiveMap = ({
  locations,
  userLocation,
  height,
  items,
  children,
  fixDefaultLocation = false,
  useSelection = false,
  useAttribution = false,
  useScaleLine = false,
  useZoom = true,
  useZoomSlider = false,
  useFullscreenBtn = true,
  useCenterBtn = true,
  useLiveLocation = false,
  ...delegated
}: InteractiveMapProps) => {
  const [first, ...rest] = locations;
  const map = useRef<RMap>(null);
  const userCoords = getCoords();
  const {setUrl} = useRedirect();
  const getOrigin = useCallback(() => {
    let coords = [first?.lng, first?.lat];
    if (!first?.lng && !first?.lat) {
      coords = [
        userLocation?.longitude ?? userCoords?.lng ?? 0,
        userLocation?.latitude ?? userCoords?.lat ?? 0,
      ];
    }
    return coords;
  }, [
    first?.lng,
    userLocation?.longitude,
    first?.lat,
    userLocation?.latitude,
    userCoords,
  ]);
  const [loc, setLoc] = useState(getOrigin);
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
  const [domLoaded, setDomLoaded] = useState(false);

  const changeView = useCallback((evt: MapBrowserEvent<UIEvent>) => {
    const coords = evt.map.getCoordinateFromPixel(evt.pixel);
    const lonlat = toLonLat(coords);
    setLoc(lonlat);
  }, []);

  useEffect(() => {
    setDomLoaded(true);
    const newLoc = getOrigin();
    setLoc(newLoc);
    const center = locations.length ? getCenter(extent) : fromLonLat(newLoc);
    setView({center, zoom: 13});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      !fixDefaultLocation ||
      !domLoaded ||
      first ||
      !userCoords ||
      !userCoords?.lng ||
      !userCoords?.lat
    )
      return;
    const lngDiff = Math.abs(
      Math.abs(userLocation?.longitude ?? 0) - Math.abs(userCoords?.lng)
    );
    const latDiff = Math.abs(
      Math.abs(userLocation?.latitude ?? 0) - Math.abs(userCoords?.lat)
    );
    if (lngDiff >= 1.5 && latDiff >= 1.5) {
      setUrl(
        [
          ['lng', `${userCoords?.lng}`],
          ['lat', `${userCoords?.lat}`],
        ],
        {
          reload: true,
          noReplace: true,
        }
      );
    }
  }, [
    domLoaded,
    userCoords,
    first,
    userLocation?.longitude,
    userLocation?.latitude,
    fixDefaultLocation,
    setUrl,
  ]);

  const isFullscreen = useFullscreen();

  if (IS_SERVER) return null;

  const selectItem = (itemId: string) => {
    if (!itemId || !useSelection) return;
    setUrl([['selected', itemId]]);
  };

  const fitView = async (
    coordinate: Coordinate,
    {ms, zoom}: {ms?: number; zoom?: number} = {}
  ) => {
    if (coordinate[0] === view.center[0] && coordinate[1] === view.center[1])
      return;
    const point = new Point(coordinate);
    const currentZoom = view.zoom;
    map.current?.ol.getView().fit(point.getExtent(), {
      duration: (ms ?? 1000) / 2,
      maxZoom: (zoom ?? currentZoom) - 1,
    });
    await delay((ms ?? 1000) / 2);
    map.current?.ol.getView().fit(point.getExtent(), {
      duration: (ms ?? 1000) / 2,
      maxZoom: zoom ?? currentZoom,
    });
    return new Promise(resolve =>
      resolve(
        setTimeout(
          () => setView({center: coordinate, zoom: zoom ?? currentZoom}),
          ms ?? 1000
        )
      )
    );
  };

  const style: {[key: string]: string} = {
    '--height': isFullscreen ? '100vh' : height ?? '40vh',
  };

  const btnOnHover = {
    color: 'rgba(20, 20, 20)',
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
          ref={map}
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
          {(useAttribution || isFullscreen) && <RControl.RAttribution />}
          {(useScaleLine || isFullscreen) && <RControl.RScaleLine />}
          {(useZoom || isFullscreen) && <RControl.RZoom />}
          {(useZoomSlider || isFullscreen) && <RControl.RZoomSlider />}
          {(useFullscreenBtn || isFullscreen) && (
            <RControl.RFullScreen
              className={`${styles.fullscreenBtn}`}
              source='interactive-map'
              // label='&#x6269;'
              // labelActive='&#x564f;'
            >
              &#x6269;
            </RControl.RFullScreen>
          )}
          <RControl.RCustom className={`${styles.mapButtons}`}>
            {(useCenterBtn || isFullscreen) && (
              <IconButton
                icon={<MdCenterFocusWeak width={20} />}
                className={styles.mapButton}
                onClick={(evt: MouseEvent<HTMLButtonElement>) =>
                  fitView(center)
                }
                whileHover={btnOnHover}
                whileFocus={btnOnHover}
              />
            )}
            {(useLiveLocation || isFullscreen) && (
              <IconButton
                icon={<FaLocationCrosshairs width={20} />}
                className={styles.mapButton}
                onClick={async (evt: MouseEvent<HTMLButtonElement>) => {
                  if (!userCoords) return;
                  const center = fromLonLat([userCoords.lng, userCoords.lat]);
                  await fitView(center);
                }}
                whileHover={btnOnHover}
                whileFocus={btnOnHover}
              />
            )}
          </RControl.RCustom>

          <RLayerVector zIndex={12}>
            <RStyle.RStyle>
              <RStyle.RIcon
                color={'rgba(30, 30, 220, 0.9)'}
                size={[40, 40]}
                src={'/img/icons/marker.svg'}
                anchor={[0.5, 0.8]}
              />
            </RStyle.RStyle>
            {/* <RStyle.RStyle>
              <RStyle.RIcon
                color={'rgba(30, 30, 220, 0.9)'}
                size={[40, 40]}
                src={'/img/icons/marker.svg'}
                anchor={[0.5, 0.8]}
              />
            </RStyle.RStyle> */}
            <RFeature
              geometry={
                new Point(
                  fromLonLat([userCoords?.lng ?? 0, userCoords?.lat ?? 0])
                )
              }
              key={`marker-0`}
            ></RFeature>
            <RFeature
              geometry={new Point(fromLonLat(loc))}
              onClick={(evt: RFeatureUIEvent) => {
                console.log(evt.target.getGeometry());
                evt.map.getView().fit(evt.target.getGeometry()!.getExtent(), {
                  duration: 300,
                  maxZoom: 16,
                });
                selectItem(first?.id ?? '');
              }}
              key={'marker-1'}
            >
              <RPopup trigger={'click'} className='example-overlay'>
                <div className='card'>
                  {first?.title && (
                    <p className='card-header'>
                      <strong>{first.title}</strong>
                    </p>
                  )}
                  <p className='card-body text-center'>
                    {first?.lng}, {first?.lat}
                  </p>
                </div>
              </RPopup>
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
