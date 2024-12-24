export type Dir = 'ltr' | 'rtl';

export interface Lang {
  name: string;
  engName: string;
  code: string;
  dir: Dir;
}

export type Langs<T extends Record<string, unknown> = Record<string, unknown>> =
  {
    [K in keyof T]: T[K];
  };

export type Loc<T extends Langs> = keyof T;

export type Dict<T extends () => Record<string, unknown>> = ReturnType<T>;
