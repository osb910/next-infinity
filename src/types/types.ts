import type {CSSProperties} from 'react';
import type {PathsToStringProps, PathValue} from './object';
import type {Join, NonDotted, Split} from './array';
import {ErrorResponse, NoticeWarningResponse, SuccessResponse} from './http';

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

export type JsonRes<T = any, K extends string = string> =
  | SuccessResponse<T>
  | NoticeWarningResponse<T>
  | ErrorResponse<K>;

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

export type CSSProps = CSSProperties & {[key: `--${string}`]: string | number};

export type DottedPaths<T extends {[x: string]: any} = {}> = Join<
  PathsToStringProps<T>,
  '.'
>;

export type DotPathValue<T, S extends string> = PathValue<T, Split<S, '.'>>;

export type Chainable<T = {}> = {
  option<K extends string, V>(
    key: Exclude<K, keyof T>,
    value: V
  ): Chainable<Omit<T, K> & Record<K, V>>;
  get<P extends keyof T>(
    path?: P
  ): P extends never ? {[L in keyof T]: T[L]} : {[L in keyof T]: T[L]}[P];
};
