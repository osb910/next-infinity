export type FindMethod =
  | 'match'
  | 'fullmatch'
  | 'search'
  | 'findall'
  | 'finditer';

export type Method = FindMethod | 'split' | `sub${'' | 'n'}`;

type Flag =
  | ('i' | 'IGNORECASE')
  | 'm'
  | 's'
  | 'u'
  | 'x'
  | 'a'
  | 'l'
  | 't'
  | 'd'
  | 'r'
  | 'f'
  | 'e'
  | 'v'
  | 'w'
  | 'b'
  | 'p';

type FlagArray = Flag[];

export interface BaseOptions {
  pattern: string;
  text: string;
  flags?: FlagArray | [];
}

export interface FindOptions extends BaseOptions {
  method: FindMethod;
  repl?: never;
}

export interface SplitOptions extends BaseOptions {
  method: 'split';
  repl?: never;
}

export interface SubOptions extends BaseOptions {
  method: 'sub' | 'subn';
  repl: string;
}

export type RunRegexOptions = FindOptions | SplitOptions | SubOptions;

export type RunRegexResponse = any;

export type RunRegex = (
  options: RunRegexOptions
) => Promise<unknown | RunRegexResponse>;
