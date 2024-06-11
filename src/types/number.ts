export type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

export type NonZero = Exclude<Digit, '0' | ''>;

export type LessThanAThousand = '0' | `${NonZero}${Digit | ''}${Digit | ''}`;

export type ParseNumber<T> = T extends number
  ? T
  : T extends `${infer N extends number}`
  ? N
  : never;

export type Int<
  T extends LessThanAThousand,
  A extends any[] = []
> = T extends LessThanAThousand
  ? T extends keyof [0, ...A]
    ? A['length']
    : Int<T, [0, ...A]>
  : never;
