import {AR_REGEX, buildArRegex} from './ar-regex';
import type {GetQueryRegexOptions} from './types';

export const emailRegex =
  /\b[-\w!#$%&'*+\/=?^_`{|}~]+(?:\\.[-\w!#$%&'*+\/=?^_`{|}~]+)*@(?:\w(?:[-\w]*\w)?\.)+\w(?:[-\w]*\w)?\b/;

export const noFullStop =
  /^(?!.+[؟؛]["»\])]?$|[«"][.!:،].+|.+[.!:،]["»]$)(["«]?)([^.!،:].*?[^.!،:؟؛])(["»]?)$/g;

export const stringifyRegex = (regex: RegExp): string => {
  const pattern = regex.source;
  const charSetsRegex = /(?<=\[((?!\]).)*)(?:(?!(?<!\\)\]).)+(?=\])/g;
  const escaped = pattern.replace(charSetsRegex, (match) => {
    return match.replace(
      /[()[|]|(?<!\\p)\{|(?<!\\p\{[^}]+)\}|\\\]|^-|\\-/g,
      (m) => '\\' + m.replace(/^\\/g, '')
    );
  });
  return escaped;
};

export const escapeRegex = (regex: string): string =>
  regex.replace(/[.*+?^$(){}|[\]\\]/g, '\\$&');

export const stripTags = (text: string): string =>
  text
    .replace(/<[^>]+>/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();

export const fixSpacing = (text: string): string =>
  text
    .replace(/\s{2,}/g, ' ')
    .replace(/\n{2,}/g, '\n')
    .replace(/\s+(?=[)\],.?!;:»}؛،؟”](?!\p{L}))/gu, '')
    .replace(/(?<=[([¡¿«{“])\s+/g, '')
    .replace(/([\u060C\u061B])(?!\s|$)/g, '$1 ')
    .replace(/^\s+|\s+$/gm, '')
    .trim();

export const leftifyPunctuation = (str: string) => {
  const regex =
    /^(?!".+?"[؟؛]!?$)(["«]?)([\[\)]?)([^.!،:].*?)([\]\(]?)(["»]?)( *)(\.{0,3}|!?|،?|:?)(["»]?)$/g;
  return str.replace(regex, (m, m1, m2, m3, m4, m5, m6, m7, m8) => {
    m1 = m1 === '«' ? '»' : m1;
    m2 = m2 === '(' ? ')' : m2 === '[' ? ']' : m2;
    m4 = m4 === ')' ? '(' : m4 === ']' ? '[' : m4;
    m5 = m5 === '»' ? '«' : m5;
    m8 = m8 === '»' ? '«' : m8;
    return `${m8}${m7}${m6}${m5}${m4}${m3}${m2}${m1}`;
  });
};

export const rightifyPunctuation = (str: string) => {
  const regex =
    /^(?!".+?"[؟؛]!?$)(["«]?)(\.{0,3}|!?|،?|:?)( *)(["«]?)([\[\)]?)([^.!،:].*?)([\]\(]?)(["»]?)$/g;
  return str.replace(regex, (m, m1, m2, m3, m4, m5, m6, m7, m8) => {
    m1 = m1 === '«' ? '»' : m1;
    m4 = m4 === '«' ? '»' : m4;
    m5 = m5 === '(' ? ')' : m5 === '[' ? ']' : m5;
    m7 = m7 === ')' ? '(' : m7 === ']' ? '[' : m7;
    m8 = m8 === '»' ? '«' : m8;
    return `${m8}${m7}${m6}${m5}${m4}${m3}${m2}${m1}`;
  });
};

export const anglizeQuotations = (str: string) =>
  str.replace(/"([^"]+)"/g, '«$1»');

export const quotizeAngles = (str: string) => str.replace(/«([^»]+)»/g, '"$1"');

export const deleteFirstDot = (str: string) =>
  str.replace(/^(["«»]?)\.(?!\.)(.+)$/gm, '$1$2');

export const deleteLastDot = (str: string) =>
  str.replace(/^(.+)\.(?!\.)(["«»]?)$/gm, '$1$2');

export const getQueryRegex = ({
  query,
  exactMatch = false,
  matchWholeWord = false,
  matchCase = false,
  matchDiacs = false,
  matchKashida = false,
  matchAlif = false,
  matchHamza = false,
  useRegex = false,
}: GetQueryRegexOptions): RegExp => {
  // CONSIDER REGEX
  query = useRegex ? query : escapeRegex(query);

  let flags = 'gu';

  // CASE SENSITIVITY
  flags += !matchCase ? 'i' : '';

  let queryPattern = exactMatch
    ? // EXACT MATCH AND WHOLE WORD
      matchWholeWord
      ? `(?<!\\p{L})(${query})(?!\\p{L})`
      : // ONLY EXACT MATCH
        `((?:\\p{L}|\\p{M})*)(${query})((?:\\p{L}|\\p{M})*)`
    : query
        .split(' ')
        .map((word) =>
          // ONLY WHOLE WORD
          matchWholeWord
            ? `(?<!\\p{L})(${word})(?!\\p{L})`
            : // Loose
              `((?:\\p{L}|\\p{M})*)(${word})((?:\\p{L}|\\p{M})*)`
        )
        .join('|');

  // ARABIC OPTIONS
  queryPattern = AR_REGEX.letter.test(queryPattern)
    ? buildArRegex(queryPattern, {
        diacs: matchDiacs,
        kashida: matchKashida,
        alif: matchAlif,
        hamza: matchHamza,
      })
    : queryPattern;

  return new RegExp(queryPattern, flags);
};

export const fixLatinText = (text: string): string =>
  text
    // Al [dash]
    .replace(/\b(al)[\s*]*([‘'’]?[A-Z])/g, '$1-$2')
    // remove middle hyphen
    .replace(/(?![Aa]l-)([A-Z‘'’][a-z‘'’]{2,})- (?=[a-z])/g, '$1');
