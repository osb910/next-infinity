import type {Dict, Langs, Loc, DottedPaths, DotPathValue} from '@/types';
import {languages} from './config';

export type Languages = Langs<typeof languages>;
export type Language = Omit<Languages[Locale], 'dictionary'>;
export type Locale = Loc<Languages>;
export type Dictionary = Dict<Languages['en']>;
export type DottedL10n = DottedPaths<Dictionary>;
export type Localize = (options: {
  locale?: Locale;
  path?: DottedL10n;
}) => Promise<any>;

export type L6e = <K extends DottedL10n>(key: K) => DotPathValue<Dictionary, K>;
