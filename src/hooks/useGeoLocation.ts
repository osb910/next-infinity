'use client';

import {useState, useLayoutEffect} from 'react';

export interface GeolocationState {
  accuracy: number;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  latitude: number;
  longitude: number;
  speed: number | null;
}

export interface GeolocationError {
  code: number;
  message: string;
  PERMISSION_DENIED: number;
  POSITION_UNAVAILABLE: number;
  TIMEOUT: number;
}

export type UseGeolocationReturn = {
  loading: boolean;
  error: GeolocationError | null;
  data: Partial<GeolocationState>;
};

const useGeolocation = (options?: PositionOptions) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<GeolocationError | null>(null);
  const [data, setData] = useState<Partial<GeolocationState>>({});

  useLayoutEffect(() => {
    const successHandler = (evt: GeolocationPosition) => {
      setLoading(false);
      setError(null);
      setData(evt.coords);
    };

    const errorHandler = (evt: GeolocationPositionError) => {
      setError(evt);
      setLoading(false);
    };

    if (!navigator.geolocation) {
      setError({
        code: 0,
        message: 'Geolocation is not supported',
        PERMISSION_DENIED: 1,
        POSITION_UNAVAILABLE: 2,
        TIMEOUT: 3,
      });
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      successHandler,
      errorHandler,
      options
    );

    const id = navigator.geolocation.watchPosition(
      successHandler,
      errorHandler,
      options
    );

    return () => navigator.geolocation.clearWatch(id);
  }, [options]);

  return {loading, error, data};
};

export default useGeolocation;
