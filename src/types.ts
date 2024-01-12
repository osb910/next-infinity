import {type NextRequest} from 'next/server';
import {type Metadata, type ResolvingMetadata} from 'next';
import {type HydratedDocument} from 'mongoose';

export interface PageProps<
  T = Record<string, string>,
  K = Record<string, string | string[] | undefined>
> {
  params: T;
  searchParams: K;
}

export type AppPage<
  T = Record<string, string>,
  K = Record<string, string | string[] | undefined>
> = (props: PageProps<T, K>) => Promise<any>;

export type GetMetadata<T extends (...args: any) => any = AppPage> = (
  props: Parameters<T>[0],
  parent: ResolvingMetadata
) => Promise<Metadata>;

export type AppRoute<T = Record<string, string>> = (
  req: NextRequest,
  {params}: {params: T}
) => Promise<any>;

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

export type HDoc<T> = HydratedDocument<T> & {
  _doc: T;
};

export interface JsonRes<T = any> extends Partial<P8n> {
  status: 'status' | 'error' | 'warning' | 'notice';
  code: number;
  message: string;
  data?: T;
}
