export type Dir = 'ltr' | 'rtl';

export interface Lang {
  name: string;
  engName: string;
  code: string;
  dir: Dir;
  dictionary: {[x: string]: any};
}

export type Langs<T extends {[x: string]: any} = {}> = {
  [K in keyof T]: T[K];
};

export type Loc<T extends Langs> = keyof T;

export type Dict<T extends {dictionary: any}> = Awaited<
  ReturnType<T['dictionary']>
>;
