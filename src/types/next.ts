import type {NextRequest} from 'next/server';
import type {Metadata, ResolvingMetadata} from 'next';
import type {ReactNode} from 'react';

export interface PageProps<
  T = Record<string, any>,
  K = Record<string, string | string[] | undefined>
> {
  params: T;
  searchParams: K & Record<string, string | string[] | undefined>;
}

export interface LayoutProps<T = Record<string, any>> {
  params: T;
  children: ReactNode;
}

export type AppPage<
  T = Record<string, any>,
  K = Record<string, string | string[] | undefined>
> = (props: PageProps<T, K>) => Promise<any>;

export type AppPageSync<
  T = Record<string, any>,
  K = Record<string, string | string[] | undefined>
> = (props: PageProps<T, K>) => any;

export type Layout<T = Record<string, any>> = (
  props: LayoutProps<T>
) => Promise<any>;

export type GetMetadata<T extends (...args: any) => any = AppPage> = (
  props: Parameters<T>[0],
  parent: ResolvingMetadata
) => Promise<Metadata>;

export type AppRoute<T = Record<string, any>> = (
  req: NextRequest,
  {params}: {params: T}
) => Promise<any>;
