export type Method = 'findall' | 'match' | 'search';

export interface RunRegexOptions {
  method: Method;
  pattern: string;
  str: string;
  flags?: string;
}
