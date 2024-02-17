export const range = (
  start: number,
  end?: number | undefined,
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
    lng: 0,
    lat: 0,
  };

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const success = (pos: any) => {
    const crd = pos.coords;

    Object.assign(coords, {
      lng: crd.longitude,
      lat: crd.latitude,
    });
  };

  navigator.geolocation.getCurrentPosition(
    success,
    (err: any) => {
      console.warn(`ERROR: ${err.message}`);
      return null;
    },
    options
  );

  return coords;
};

export const approx = (num: number, precision: number = 2) => {
  const product = +`1${`0`.repeat(precision)}`;
  return Math.round(num * product) / product;
};
