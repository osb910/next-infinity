import type {CSSProperties} from 'react';

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

export interface JsonRes<T = any> extends Partial<P8n> {
  status: 'success' | 'error' | 'warning' | 'notice';
  code: number;
  message: string;
  data?: T & {
    errors?: {[x: string]: any};
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

export type CSSProps = CSSProperties & {[key: `--${string}`]: string | number};
