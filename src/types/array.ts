import {Equal} from './util';

export type Join<T extends string[], D extends string> = T extends []
  ? never
  : T extends [infer F]
  ? F
  : T extends [infer F, ...infer R]
  ? F extends string
    ? `${F}${D}${Join<Extract<R, string[]>, D>}`
    : never
  : string;

export type Split<S extends string, D extends string> = string extends S
  ? string[]
  : S extends `${infer T}${D}${infer U}`
  ? [T, ...Split<U, D>]
  : [S];

export type Includes<T extends readonly any[], U> = T extends [
  infer F,
  ...infer R
]
  ? Equal<U, F> extends true
    ? true
    : Includes<R, U>
  : false;

export type First<T extends any[]> = T['length'] extends 0 ? never : T[0];

export type Length<T extends readonly any[]> = T['length'];
