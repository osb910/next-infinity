export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <
  T
>() => T extends Y ? 1 : 2
  ? true
  : false;

export type If<C extends boolean, T, F> = C extends true ? T : F;

export type DeepAwaited<T extends PromiseLike<any>> = T extends PromiseLike<
  infer U
>
  ? U extends PromiseLike<any>
    ? DeepAwaited<U>
    : U
  : never;
