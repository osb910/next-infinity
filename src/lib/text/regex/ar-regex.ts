import {type BuildArRegexOptions} from './types';

export const AR_UNICODE = Object.freeze({
  hamza: ['\\u0621', '\\u0622', '\\u0623', '\\u0624', '\\u0625', '\\u0626'],
  //            لࢭ    |     ٱ    |     لٰ    |     لٖ     |     ا
  alifVar: ['\\u0627', '\\u0656', '\\u0670', '\\u0671', '\\u08AD'],
  alifForms: [
    '\\u0622',
    '\\u0623',
    '\\u0625',
    '\\u0627', // ا
    '\\u0656', // لٖ
    '\\u0670', // لٰ
    '\\u0671', // ٱ
    '\\u0672',
    '\\u0673',
    '\\u0675',
    '\\u08AD', // لࢭ
  ],
  alifSounds: [
    '\\u0622', // آ
    '\\u0627', // ا
    '\\u0649', // ى
    '\\u0656', // لٖ
    '\\u0670', // لٰ
    '\\u0671', // ٱ
    '\\u06CC', // ی
    '\\u08AD', // لࢭ
  ],
  fathNunation: ['\\u064B', '\\u0657', '\\u08F0', '\\u064E\\u06E2'],
  dammNunation: ['\\u064C', '\\u065E', '\\u08F1', '\\u064F\\u06E2'],
  kasrNunation: ['\\u064D', '\\u0656', '\\u08F2', '\\u0650\\u06ED'],
  sukuun: ['\\u0652', '\\u06E1'],
  kashida: '\\u0640',
});

export const AR_REGEX = Object.freeze({
  ALLAH:
    /[\u0627\u0671]\u0644{2}(?:\u0651[\u0670\u064E]?)?\u0647\p{Mn}?|\uFDF2/gu,
  // @ts-ignore
  anyChar: /\p{Script_Extensions=Arabic}/gu,
  anyCharU: '\\p{Script_Extensions=Arabic}',
  // @ts-ignore
  char: /(?=\p{Script_Extensions=Arabic})[^\p{N}\p{P}]/gu,
  charU: '(?:(?=\\p{Script_Extensions=Arabic})[^\\p{N}\\p{P}])',
  // @ts-ignore
  //   char: /(?=\p{Script_Extensions=Arabic})[\p{L}\p{Mn}]/gu,
  // charU: '(?:(?=\\p{Script_Extensions=Arabic})[\\p{L}\\p{Mn}])',
  letter: /(?=\p{Script=Arabic})\p{L}/gu,
  letterU: '(?:(?=\\p{Script=Arabic})\\p{L})',
  // @ts-ignore
  diacritic: /(?=\p{Script_Extensions=Arabic})\p{Mn}/gu,
  diacriticU: '(?:(?=\\p{Script_Extensions=Arabic})\\p{Mn})',
  wholeLetter:
    // @ts-ignore
    /((?=\p{Script=Arabic})\p{L})((?=\p{Script_Extensions=Arabic})\p{Mn}{0,4})/gu,
  wholeLetterU:
    '(?:(?=\\p{Script=Arabic})\\p{L})(?:(?=\\p{Script_Extensions=Arabic})\\p{Mn}{0,4})',
  hamza: /[\u0621-\u0626]/g,
  //            لࢭ  |  ٱ  |  لٰ  |  لٖ  |  ا
  alifVar: /[\u0627\u0656\u0670\u0671\u08AD]/g,
  alifForms: /[\u0622\u0623\u0625\u0627\u0656\u0670-\u0673\u0675\u08AD]/g,
  alifSounds: /[\u0622\u0627\u0649\u0656\u0670\u0671\06CC\u08AD]/g,
  fathNunation: /([\u064B\u0657\u08F0]|\u064E\u06E2)/g,
  dammNunation: /([\u064C\u065E\u08F1]|\u064F\u06E2)/g,
  kasrNunation: /([\u064D\u0656\u08F2]|\u0650\u06ED)/g,
  nunationAlif: /([\u064B\u0657\u08F0]|\u064E\u06E2)(\u0627)/g,
  nunationAlifU: '(?:[\\u064B\\u0657\\u08F0]|\\u064E\\u06E2)(?:\\u0627)',
  alifNunation: /(\u0627)([\u064B\u0657\u08F0]|\u064E\u06E2)/g,
  alifNunationU: '(?:\\u0627)(?:[\\u064B\\u0657\\u08F0]|\\u064E\\u06E2)',
  sukuun: /[\u0652\u06E1]/g,
  kashida: /\u0640/g,
});

export const hasArText = (text: string): boolean => AR_REGEX.char.test(text);

export const isOnlyArText = (text: string): boolean =>
  new RegExp(`^[${AR_REGEX.anyChar}\\p{P}\\p{Z}\\s]+$`, 'u').test(text);

export const isTextMissing = (
  text: string,
  {phrase = 'سقطمنالنسخة'}: {phrase: string}
): boolean => !!text.trim().match(RegExp(`^\\s*(\\[${phrase}\\])?\\s*$`));

export const isTextIncomplete = (
  text: string,
  {phrase = 'سقطمنالنسخة'}: {phrase: string}
): boolean => !!text.trim().match(RegExp(`\\[${phrase}\\]`));

export const stripArDiacritics = (text: string): string =>
  text.replace(AR_REGEX.diacritic, '');

export const fixArText = (text: string): string =>
  text
    // الفاصلة العربية
    .replace(new RegExp(`,(?=\\s*${AR_REGEX.letterU})`, 'gu'), '،')
    // الفاصلة المنقوطة العربية
    .replace(new RegExp(`;(?=\\s*${AR_REGEX.letterU})`, 'gu'), '؛')
    // الجملة الاعتراضية
    .replace(
      new RegExp(
        `,(?<!\\d)(-)\\s{1,2}((?:${AR_REGEX.wholeLetterU}|\\s|:|،)+)\\s{1,2}(-)`,
        'gmu'
      ),
      '$1$2$3'
    );

export const buildArRegex = (
  str: string,
  {
    diacs = false,
    kashida = false,
    alif = false,
    hamza = false,
  }: BuildArRegexOptions = {}
): string => {
  let optionalPattern = !diacs
    ? !kashida
      ? `${AR_UNICODE.kashida}*${AR_REGEX.diacriticU}{0,4}${AR_UNICODE.kashida}*`
      : `${AR_REGEX.diacriticU}{0,4}`
    : !kashida
    ? `${AR_UNICODE.kashida}*`
    : '';

  return (
    str
      // Consider Holy Name ornament
      .replace(AR_REGEX.ALLAH, '(?:$0|\\uFDF2)')
      // Consider Muhammad ornament
      .replace(/(محمد)/g, '(?:$1|\\uFDF4)')
      // Consider salah ornament
      .replace(/(صلى الله عليه وسلم)/g, '(?:$1|\\uFDFA)')
      // Consider jalla jalaluhou ornament
      .replace(/(جل جلاله)/g, '(?:$1|\\uFDFB)')
      // Consider basmala ornament
      .replace(/(بسم الله الرحمن الرحيم)/g, '(?:$1|\\uFDFD)')
      // Consider 2 positions of fath nunation around alif
      .replace(AR_REGEX.nunationAlif, '(?:$1$2|$2$1)')
      .replace(AR_REGEX.alifNunation, '(?:$1$2|$2$1)')
      // Optional diacritics and/or kashida on choice
      .replace(AR_REGEX.wholeLetter, `$&${optionalPattern}`)
      // Consider hamza shapes
      .replace(AR_REGEX.hamza, !hamza ? AR_REGEX.hamza.source : '$&')
      // Consider alif shapes w/ optional hamza on choice
      .replace(
        AR_REGEX.alifVar,
        !alif ? AR_REGEX.alifForms.source : AR_REGEX.alifSounds.source
      )
      // Consider circle and rasKhaa of sukuun
      .replace(AR_REGEX.sukuun, AR_REGEX.sukuun.source)
      // Consider 3 shapes of fath nunation
      .replace(/\u064B/g, `(?:${AR_UNICODE.fathNunation.join('|')})`)
      // Consider 3 shapes of damm nunation
      .replace(/\u064C/g, `(?:${AR_UNICODE.dammNunation.join('|')})`)
      // Consider 3 shapes of kasr nunation
      .replace(/\u064D/g, `(?:${AR_UNICODE.kasrNunation.join('|')})`)
  );
};

// EXPERIMENTAL
export const buildArPyRegex = (
  str: string,
  {
    diacs = false,
    kashida = false,
    alif = false,
    hamza = false,
  }: BuildArRegexOptions = {}
): string => {
  const diacsClass = '\\p{Script_Extensions=Arabic})&&\\p{Mn}';
  let optional = !diacs
    ? !kashida
      ? `${diacsClass}${AR_UNICODE.kashida}`
      : diacsClass
    : !kashida
    ? `${AR_UNICODE.kashida}`
    : '';
  const maxFuzzy = kashida ? 64 : 16;
  const fuzzyBlock = optional ? `{i<=${maxFuzzy}:[${optional}]}` : '';

  return (
    str
      // Consider Holy Name ornament
      .replace(AR_REGEX.ALLAH, '(?:$0|\\uFDF2)')
      // Consider Muhammad ornament
      .replace(/(محمد)/g, '(?:$1|\\uFDF4)')
      // Consider salah ornament
      .replace(/(صلى الله عليه وسلم)/g, '(?:$1|\\uFDFA)')
      // Consider jalla jalaluhou ornament
      .replace(/(جل جلاله)/g, '(?:$1|\\uFDFB)')
      // Consider basmala ornament
      .replace(/(بسم الله الرحمن الرحيم)/g, '(?:$1|\\uFDFD)')
      // Consider 2 positions of fath nunation around alif
      .replace(AR_REGEX.nunationAlif, '(?:$1$2|$2$1)')
      .replace(AR_REGEX.alifNunation, '(?:$1$2|$2$1)')
  );
};
