import type {CSSProperties} from 'react';
import type {PathsToStringProps, PathValue} from './object';
import type {Join, Split} from './array';

export type AnyFn = (...args: unknown[]) => unknown;

export type ImpureFn = (...args: unknown[]) => void;

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

export interface Img {
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

// export type CSSProps = CSSProperties & {[key: `--${string}`]: string | number};
export type CSSProps = CSSProperties & Record<`--${string}`, string | number>;

export type DottedPaths<
  T extends {[x: string]: unknown} = Record<string, unknown>
> = Join<PathsToStringProps<T>, '.'>;

export type DotPathValue<T, S extends string> = PathValue<T, Split<S, '.'>>;
