import type {GeoLocation} from '@/types';
import type {
  ReactNode,
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
} from 'react';
import type {MotionProps} from 'framer-motion';

export type Location = {lng: number; lat: number; id: string; title?: string};

export type InteractiveMapProps = ComponentPropsWithRef<'figure'> &
  Partial<MotionProps> & {
    locations: Array<Location>;
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
    markerColor?: string;
    buttonStyle?: ComponentPropsWithoutRef<'button'>['style'] &
      Record<string, any>;
  };
