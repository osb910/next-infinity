import {Equal} from './util';

export type Includes<T extends readonly any[], U> = T extends [
  infer F,
  ...infer R
]
  ? Equal<U, F> extends true
    ? true
    : Includes<R, U>
  : false;

export type Length<T extends readonly any[]> = T['length'];

export type First<T extends any[]> = T['length'] extends 0 ? never : T[0];

export type Last<T extends any[]> = T extends [...infer _, infer U] ? U : never;
// T['length'] extends 0
//   ? never
//   : T['length'] extends 1
//   ? T[0]
//   : T extends [infer F, ...infer R]
//   ? R['length'] extends 1
//     ? R[0]
//     : Last<R>
//   : never;

export type Concat<T extends readonly any[], U extends readonly any[]> = [
  ...T,
  ...U
];

export type Push<T extends Array<any>, U> = [...T, U];

export type Unshift<T extends Array<any>, U> = [U, ...T];

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
