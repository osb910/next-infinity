'use client';

import {useState, useEffect, useCallback, useRef} from 'react';
import {Geometry, Point} from 'ol/geom';
import {fromLonLat, toLonLat} from 'ol/proj';
import {boundingExtent, getCenter} from 'ol/extent';
import {
  RMap,
  ROSM,
  RLayerTile,
  RLayerVector,
  RFeature,
  RStyle,
  RControl,
  RPopup,
  type RFeatureUIEvent,
} from 'rlayers';
import {motion} from 'framer-motion';
// import {FaLocationCrosshairs} from 'react-icons/fa6';
import {MdCenterFocusWeak} from 'react-icons/md';
import {AiOutlineFullscreen, AiOutlineFullscreenExit} from 'react-icons/ai';
import {TbLiveView} from 'react-icons/tb';
import {MdOutlineContentCopy} from 'react-icons/md';
import useRedirect from '@/hooks/useRedirect';
import useFullscreen from '@/hooks/useFullscreen';
import IconButton from '@/ui/IconButton';
import Spinner from '@/ui/Spinner';
import {approx, getCoords} from '@/utils/numbers';
import {IS_SERVER} from '@/utils/path';
import {delay} from '@/utils/promises';
import {copy} from '@/utils/text/clipboard';
import {type MapBrowserEvent} from 'ol';
import type {Coordinate} from 'ol/coordinate';
import {type RView} from 'rlayers/RMap';
import type {InteractiveMapProps} from './types';
import styles from './InteractiveMap.module.css';
import 'rlayers/control/layers.css';
import 'ol/ol.css';
import {TIME} from '@/utils/constants';

const markerIcon = '/img/icons/marker.svg';
const liveLocationIcon = '/img/icons/location-crosshairs.svg';

const layersButton = <button>&#9776;</button>;

const style: Record<string, any> = {
  '--bg-img': `linear-gradient(
    to right,
    hsla(0, 0%, 53%, 0.6) 0% 15%,
    hsla(240, 40%, 15%, 0.6) 20% 35%,
    hsla(0, 0%, 53%, 0.6) 45% 55%,
    hsla(240, 40%, 15%, 0.6) 65% 80%,
    hsla(0, 0%, 53%, 0.6) 85% 100%
  )`,
};

const btnAnimation = {
  color: 'rgba(20, 20, 20, 0.8)',
};

const transition = {
  type: 'spring',
  stiffness: 150,
  damping: 18,
};

export const InteractiveMap = ({
  locations,
  userLocation,
  height = '40vh',
  items,
  children,
  useZoom = true,
  useFullscreenBtn = true,
  useCenterBtn = true,
  useLiveLocation = false,
  useAttribution = false,
  useZoomSlider = false,
  useScaleLine = false,
  useSelection = false,
  fixDefaultLocation = false,
  markerColor = 'rgba(30, 30, 220, 0.9)',
  buttonStyle,
  ...delegated
}: InteractiveMapProps) => {
  const [first] = locations;
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
  const [liveLocation, setLiveLocation] = useState<{
    geometry: Geometry;
    coordinates: Coordinate;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(0);
  const [domLoaded, setDomLoaded] = useState(false);
  const {isFullscreen, isMaximized, toggleFullscreen} = useFullscreen({
    id: delegated?.id ?? 'interactive-map',
    useMaximize: true,
  });

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

  // update live location
  useEffect(() => {
    if (!useLiveLocation || !userCoords) return;
    let i = 0;
    const getLiveLocation = (): typeof liveLocation => {
      const point = new Point(fromLonLat([userCoords?.lng, userCoords?.lat]));
      const coordinates = toLonLat(point.getFlatCoordinates());
      if (coordinates[0] === 0 && coordinates[1] === 0) {
        i++;
        return i > 100 ? null : getLiveLocation();
      }
      return {
        geometry: point,
        coordinates: [approx(coordinates[0], 5), approx(coordinates[1], 5)],
      };
    };
    const interval = setInterval(() => {
      const newLiveLocation = getLiveLocation();
      if (!newLiveLocation) return;
      setLiveLocation(newLiveLocation);
    }, TIME.goldenSec * 3);
    return () => clearInterval(interval);
  }, [useLiveLocation, userCoords]);

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
    const duration = (ms ?? TIME.goldenSec * 0.7) / 2;

    map.current?.ol.getView().fit(point.getExtent(), {
      duration,
      maxZoom: (zoom ?? currentZoom) - 1,
    });

    await delay(duration);

    map.current?.ol.getView().fit(point.getExtent(), {
      duration,
      maxZoom: zoom ?? currentZoom,
    });

    return new Promise((resolve) =>
      resolve(
        setTimeout(
          () => setView({center: coordinate, zoom: zoom ?? currentZoom}),
          ms ?? 1000
        )
      )
    );
  };

  const wrapperStyle: Record<string, any> = {
    '--height': isFullscreen ? '100vh' : height,
  };

  return (
    <motion.section
      style={wrapperStyle}
      className={`${styles.wrapper}`}
    >
      {!domLoaded && (
        <Spinner
          size={36}
          className={styles.loader}
        />
      )}
      {domLoaded && (
        <motion.figure
          {...delegated}
          id={delegated?.id ?? 'interactive-map'}
          className={`${styles.map} ${isMaximized ? styles.maximized : ''} ${
            delegated.className ?? ''
          }`}
          style={{...style, ...delegated.style}}
          layout={true}
          transition={{...delegated.transition, ...transition}}
        >
          <motion.div
            layout={'position'}
            transition={transition}
          >
            {!!isLoading && (
              <Spinner
                size={36}
                className={styles.loader}
              />
            )}
            <RMap
              className={styles.rMap}
              initial={initial}
              view={[view, setView]}
              noDefaultControls
              // extent={extent}
              // onClick={changeView}
              ref={map}
            >
              {/* <RControl.RLayers element={layersButton}> */}
              <ROSM properties={{label: 'OpenStreetMap'}} />
              {/* <RLayerTile
                  properties={{label: 'OpenTopo'}}
                  url='https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png'
                  attributions='Kartendaten: © OpenStreetMap-Mitwirkende, SRTM | Kartendarstellung: © OpenTopoMap (CC-BY-SA)'
                />
                <RLayerTile
                  properties={{label: 'Transport'}}
                  url='http://tile.thunderforest.com/transport/{z}/{x}/{y}.png'
                />
              </RControl.RLayers> */}
              {(useAttribution || isFullscreen) && <RControl.RAttribution />}
              {(useScaleLine || isFullscreen) && <RControl.RScaleLine />}
              {(useZoom || isFullscreen) && <RControl.RZoom />}
              {(useZoomSlider || isFullscreen) && <RControl.RZoomSlider />}
              <RControl.RCustom className={`${styles.mapButtons}`}>
                {(useFullscreenBtn || isFullscreen) && (
                  <IconButton
                    icon={
                      isFullscreen || isMaximized ? (
                        <AiOutlineFullscreenExit width={20} />
                      ) : (
                        <AiOutlineFullscreen width={20} />
                      )
                    }
                    className={`${styles.mapButton}`}
                    style={buttonStyle}
                    whileHover={btnAnimation}
                    whileFocus={btnAnimation}
                    onClick={() => toggleFullscreen()}
                  />
                )}
                {(useCenterBtn || isFullscreen) && (
                  <IconButton
                    icon={<MdCenterFocusWeak width={20} />}
                    className={styles.mapButton}
                    style={buttonStyle}
                    whileHover={btnAnimation}
                    whileFocus={btnAnimation}
                    onClick={async () => await fitView(center)}
                  />
                )}
                {(useLiveLocation || isFullscreen) && (
                  <IconButton
                    icon={<TbLiveView width={20} />}
                    className={styles.mapButton}
                    style={buttonStyle}
                    whileHover={btnAnimation}
                    whileFocus={btnAnimation}
                    onClick={async () => {
                      if (!liveLocation) return;
                      const center = fromLonLat([
                        liveLocation.coordinates[0],
                        liveLocation.coordinates[1],
                      ]);
                      await fitView(center);
                    }}
                  />
                )}
              </RControl.RCustom>
              <RLayerVector zIndex={12}>
                <RStyle.RStyle>
                  <RStyle.RIcon
                    color={markerColor}
                    src={liveLocationIcon}
                    size={[40, 40]}
                    anchor={[0.5, 0.8]}
                  />
                </RStyle.RStyle>
                {liveLocation && userCoords && (
                  <RFeature
                    geometry={liveLocation.geometry}
                    key={`marker-0`}
                    onClick={(evt: RFeatureUIEvent) =>
                      evt.map
                        .getView()
                        .fit(evt.target.getGeometry()!.getExtent(), {
                          duration: 400,
                          maxZoom: 16,
                        })
                    }
                  >
                    <RPopup
                      trigger={'click'}
                      className={styles.popup}
                    >
                      <h3 dir='auto'>Here</h3>
                      <p>
                        {liveLocation.coordinates[0]},{' '}
                        {liveLocation.coordinates[1]}
                      </p>
                      <section className={styles.actions}>
                        <IconButton
                          icon={<MdOutlineContentCopy size={20} />}
                          onClick={() =>
                            copy([
                              `${liveLocation.coordinates[0]}, ${liveLocation.coordinates[1]}`,
                            ])
                          }
                          noSfx
                        />
                      </section>
                    </RPopup>
                  </RFeature>
                )}
              </RLayerVector>
              <RLayerVector zIndex={12}>
                {locations?.map(({lng, lat, id, title}, i) => (
                  <RFeature
                    geometry={new Point(fromLonLat([lng, lat]))}
                    onClick={(evt: RFeatureUIEvent) => {
                      evt.map
                        .getView()
                        .fit(evt.target.getGeometry()!.getExtent(), {
                          duration: 400,
                          maxZoom: 16,
                        });
                      selectItem(id ?? '');
                    }}
                    key={`marker-${i + 1}`}
                  >
                    <RStyle.RStyle>
                      <RStyle.RIcon
                        color={markerColor}
                        src={markerIcon}
                        size={[36, 36]}
                        anchor={[0.5, 0.8]}
                      />
                    </RStyle.RStyle>
                    <RPopup
                      trigger={'click'}
                      className={styles.popup}
                    >
                      {title && <h3 dir='auto'>{title}</h3>}
                      <p>
                        {lng}, {lat}
                      </p>
                      <section className={styles.actions}>
                        <IconButton
                          icon={<MdOutlineContentCopy size={20} />}
                          onClick={() => copy([title ?? '', `${lng}, ${lat}`])}
                          noSfx
                        />
                      </section>
                    </RPopup>
                  </RFeature>
                ))}
              </RLayerVector>
            </RMap>
          </motion.div>
        </motion.figure>
      )}
      <motion.section
        layout={true}
        transition={transition}
      >
        {children}
      </motion.section>
    </motion.section>
  );
};

export default InteractiveMap;
