import type {NextRequest} from 'next/server';
import type {Metadata, ResolvingMetadata} from 'next';
import type {ReactNode} from 'react';

export interface PageProps<
  T = Record<string, unknown>,
  K = Record<string, string | string[] | undefined>
> {
  params: Promise<T>;
  searchParams: Promise<K & Record<string, string | string[] | undefined>>;
}

export interface LayoutProps<T = Record<string, unknown>> {
  params: Promise<T>;
  children: ReactNode;
}

export type AppPage<
  T = Record<string, unknown>,
  K = Record<string, string | string[] | undefined>
> = (props: PageProps<T, K>) => Promise<unknown>;

export type AppPageSync<
  T = Record<string, unknown>,
  K = Record<string, string | string[] | undefined>
> = (props: PageProps<T, K>) => unknown;

export type Layout<T = Record<string, unknown>> = (
  props: LayoutProps<T>
) => Promise<unknown>;

export type GetMetadata<
  T extends (props: PageProps<Record<string, unknown>>) => unknown = AppPage
> = (
  props: Awaited<Parameters<T>>[0],
  parent: ResolvingMetadata
) => Promise<Metadata>;

export type GetLayoutMetadata<T = Record<string, unknown>> = (
  props: {params: Promise<T>},
  parent: ResolvingMetadata
) => Promise<Metadata>;

export type AppRoute<T = Record<string, unknown>> = (
  req: NextRequest,
  {params}: {params: T}
) => Promise<unknown>;
