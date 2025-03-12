import type {SecondMultipliers, TimeFormat, TimeLevel, TimeUnit} from '@/types';

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

export const formatDuration = (
  seconds: number,
  format: TimeFormat = 'full'
): string => {
  const SECONDS_IN: SecondMultipliers = {
    year: 31536000,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  const calculateTimeLevels = (
    remainingSeconds: number,
    units: TimeUnit[]
  ): TimeLevel[] => {
    return units.map((unit) => {
      if (unit === 'second') {
        return {value: Math.floor(remainingSeconds % 60), unit};
      }

      const divisor = SECONDS_IN[unit];
      const previousUnit = units[units.indexOf(unit) - 1];
      const previousDivisor = previousUnit
        ? SECONDS_IN[previousUnit as keyof SecondMultipliers]
        : remainingSeconds;

      return {
        value: Math.floor((remainingSeconds % previousDivisor) / divisor),
        unit,
      };
    });
  };

  const formatUnit = (value: number, unit: TimeUnit): string => {
    return `${value} ${unit}${value !== 1 ? 's' : ''}`;
  };

  const units: Record<TimeFormat, TimeUnit[]> = {
    full: ['year', 'day', 'hour', 'minute', 'second'],
    noSeconds: ['year', 'day', 'hour', 'minute'],
    hoursMinutes: ['hour', 'minute'],
  };

  return calculateTimeLevels(seconds, units[format])
    .filter((level) => level.value > 0)
    .map((level) => formatUnit(level.value, level.unit))
    .join(' ');
};
