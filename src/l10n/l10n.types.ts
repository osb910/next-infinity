import type {Langs, Loc, DottedPaths, DotPathValue} from '@/types';
import {type ReactElement} from 'react';
import THE_DICTIONARY from '@/dictionaries';
import {languages} from './config';
import type {MdxProps} from '@/ui/Mdx/remote-client';

export type Languages = Langs<typeof languages>;
export type Locale = Loc<Languages>;
export type Language = Languages[Locale];
export type Dictionary = ReturnType<typeof THE_DICTIONARY>;
export type DottedL10n = DottedPaths<Dictionary>;
export type SubDic<T extends DottedL10n> = DotPathValue<Dictionary, T>;
export type Localize = (options: {
  locale?: Locale;
  path?: DottedL10n;
}) => Promise<any>;

export type L6eFn = <K extends DottedL10n>(
  key: K,
  options?: Record<string, unknown>
) => DotPathValue<Dictionary, K>;

export type L6eComponent = <K extends DottedL10n>(
  props: {
    k: K;
    forceMdx?: boolean;
    options?: Record<string, unknown>;
  } & Omit<MdxProps, 'source'>
) => ReactElement | undefined;
