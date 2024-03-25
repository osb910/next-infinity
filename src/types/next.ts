import {type NextRequest} from 'next/server';
import {type Metadata, type ResolvingMetadata} from 'next';

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

export type AppPageSync<
  T = Record<string, string>,
  K = Record<string, string | string[] | undefined>
> = (props: PageProps<T, K>) => any;

export type GetMetadata<T extends (...args: any) => any = AppPage> = (
  props: Parameters<T>[0],
  parent: ResolvingMetadata
) => Promise<Metadata>;

export type AppRoute<T = Record<string, string>> = (
  req: NextRequest,
  {params}: {params: T}
) => Promise<any>;
