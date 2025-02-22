export const range = (
  start: number,
  end?: number | undefined,
  step: number = 1
): number[] => {
  const output = [];
  if (typeof end === 'undefined') {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += step) {
    output.push(i);
  }
  return output;
};

export const pluralize = (word: string, num: number) =>
  num === 1 ? `1 ${word}` : `${num} ${word}s`;

export interface Coordinates {
  lng: number;
  lat: number;
}

export interface PositionOptions {
  enableHighAccuracy: boolean;
  timeout: number;
  maximumAge: number;
}

export const getCoords = async (): Promise<Coordinates | null> => {
  if (typeof window === 'undefined') {
    return null;
  }

  const options: PositionOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  try {
    const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });

    return {
      lng: pos.coords.longitude,
      lat: pos.coords.latitude,
    };
  } catch (err: GeolocationPositionError | unknown) {
    console.warn(
      `ERROR: ${
        err instanceof GeolocationPositionError ? err.message : 'Unknown error'
      }`
    );
    return null;
  }
};

export const approx = (num: number, precision: number = 2) => {
  const product = +`1${`0`.repeat(precision)}`;
  return Math.round(num * product) / product;
};
