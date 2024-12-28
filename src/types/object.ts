import type {AnyFn} from './types';

export type TupleToObject<T extends readonly PropertyKey[]> = {
  [K in T[number]]: K;
};

export type PathsToStringProps<T> = T extends object
  ? T extends AnyFn
    ? []
    :
        | {[K in Extract<keyof T, string>]: [K]}[Extract<keyof T, string>]
        | {
            [K in Extract<keyof T, string>]: [K, ...PathsToStringProps<T[K]>];
          }[Extract<keyof T, string>]
  : [];

export type PathValue<T, P extends unknown[]> = P extends [infer K, ...infer R]
  ? K extends keyof T
    ? R extends []
      ? T[K]
      : PathValue<T[K], R>
    : never
  : T;
