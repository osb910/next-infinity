export const range = (
  start: number,
  end?: number,
  step: number = 1
): number[] => {
  let output = [];
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

export const getCoords = () => {
  if (typeof window === 'undefined') {
    return null;
  }
  const coords = {
    lat: 0,
    lng: 0,
  };

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const success = (pos: any) => {
    const crd = pos.coords;

    coords.lng = crd.longitude;
    coords.lat = crd.latitude;
  };

  navigator.geolocation.getCurrentPosition(
    success,
    (err: any): void => {
      console.warn(`ERROR: ${err.message}`);
    },
    options
  );

  return coords;
};
