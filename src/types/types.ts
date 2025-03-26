import type {CSSProperties} from 'react';
import type {PathsToStringProps, PathValue} from './object';
import type {Join, Split} from './array';

export type Primitive = string | number | boolean | null | undefined;

export type AnyFn = (...args: unknown[]) => unknown;

export type ImpureFn = (...args: unknown[]) => void;

export type EventMap = WindowEventMap & HTMLElementEventMap & DocumentEventMap;

export interface P8n {
  count: number;
  skip: number;
  limit: number;
  pages: number;
  page: number;
  previous: number | null;
  next: number | null;
}

export type GetP8n = (
  count: number,
  currentPage?: number | string | null,
  perPage?: number | string | null
) => P8n;

export interface JsonRes<T = unknown> extends Partial<P8n> {
  status: 'success' | 'error' | 'warning' | 'notice';
  code: number;
  message: string;
  data?: T & {
    errors?: {[x: string]: unknown};
  };
}

export interface GeoLocation {
  ip: string | undefined;
  country: string | undefined;
  countryCode?: string;
  region: string | undefined;
  city: string | undefined;
  longitude: number | undefined;
  latitude: number | undefined;
  zipCode?: string;
  timeZone?: string;
  isp?: string;
  asn?: string;
  as?: string;
  isProxy?: boolean;
  source?: string;
}

export interface FileInfo {
  key: string;
  ogName: string;
  title: string;
  ogTitle: string;
  ext: string;
  mimeType: string;
  size: number;
  readableSize: string;
  caption?: string;
}

// export type CSSProps = CSSProperties & {[key: `--${string}`]: string | number | undefined};
export type CSSProps = CSSProperties &
  Record<`--${string}`, string | number | undefined>;

export type DottedPaths<
  T extends {[x: string]: unknown} = Record<string, unknown>
> = Join<PathsToStringProps<T>, '.'>;

export type DotPathValue<T, S extends string> = PathValue<T, Split<S, '.'>>;

export type MonthString =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';
export type ShortMonthString =
  | 'Jan'
  | 'Feb'
  | 'Mar'
  | 'Apr'
  | 'May'
  | 'Jun'
  | 'Jul'
  | 'Aug'
  | 'Sep'
  | 'Oct'
  | 'Nov'
  | 'Dec';
export type Ordinal = 'st' | 'nd' | 'rd' | 'th';
export type AmPm = 'AM' | 'PM';

export type DateFormat =
  // Numeric formats
  | `${number}-${number}-${number}`
  | `${number}/${number}/${number}`
  | `${number}.${number}.${number}`

  // Month as string formats
  | `${number}-${MonthString | ShortMonthString}-${number}`
  | `${MonthString | ShortMonthString}-${number}-${number}`
  | `${number} ${MonthString | ShortMonthString} ${number}`
  | `${MonthString | ShortMonthString} ${number}, ${number}`

  // ISO format
  | `${number}-${number}-${number}T${number}:${number}:${number}`
  | `${number}-${number}-${number}T${number}:${number}:${number}Z`

  // Time included
  | `${number}-${number}-${number} ${number}:${number}`
  | `${number}-${number}-${number} ${number}:${number}:${number}`
  | `${
      | MonthString
      | ShortMonthString} ${number}, ${number} ${number}:${number}${AmPm}`

  // Ordinal dates
  | `${number}${Ordinal} ${MonthString | ShortMonthString} ${number}`
  | `${MonthString | ShortMonthString} ${number}${Ordinal}, ${number}`;

export type TimeUnit = 'year' | 'day' | 'hour' | 'minute' | 'second';
export type TimeFormat = 'full' | 'noSeconds' | 'hoursMinutes';

export interface TimeLevel {
  value: number;
  unit: TimeUnit;
}

export type SecondMultipliers = Record<Exclude<TimeUnit, 'second'>, number>;
