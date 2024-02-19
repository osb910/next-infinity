const emailRegex =
  /\b[-\w!#$%&'*+\/=?^_`{|}~]+(?:\\.[-\w!#$%&'*+\/=?^_`{|}~]+)*@(?:\w(?:[-\w]*\w)?\.)+\w(?:[-\w]*\w)?\b/;

const stringifyRegex = (regex: RegExp): string => {
  const pattern = regex.source;
  const charSetsRegex = /(?<=\[((?!\]).)*)(?:(?!(?<!\\)\]).)+(?=\])/g;
  const escaped = pattern.replace(charSetsRegex, match => {
    return match.replace(
      /[()[|]|(?<!\\p)\{|(?<!\\p\{[^}]+)\}|\\\]|^-|\\-/g,
      m => '\\' + m.replace(/^\\/g, '')
    );
  });
  return escaped;
};

const isTextMissing = (text: string): boolean =>
  !!text.trim().match(/^\s*(\[سقطمنالنسخة\])?\s*$/);

const isTextIncomplete = (text: string): boolean =>
  !!text.trim().match(/\[سقطمنالنسخة\]/);

const stripDiacritics = (text: string): string =>
  text.replace(/(?=\p{Script_Extensions=Arabic})\p{M}/gu, '');

const stripTags = (text: string): string =>
  text
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const fixSpacing = (text: string): string =>
  text
    .replace(/\s{2,}/g, ' ')
    .replace(/\n{2,}/g, '\n')
    .replace(/\s+(?=[)\],.?!;:»}؛،؟”](?!\p{L}))/gu, '')
    .replace(/(?<=[([¡¿«{“])\s+/g, '')
    .replace(/([\u060C\u061B])(?!\s|$)/g, '$1 ')
    .replace(/^\s+|\s+$/gm, '')
    .trim();

const fixArText = (text: string): string =>
  text
    .replace(/,(?=\s?[\u0621-\u0652])/g, '،')
    .replace(/;(?=\s?[\u0621-\u0652])/g, '؛')
    .replace(/(?<!\d)(-) ([\u0621-\u0652\s:،]+) (-)/g, '$1$2$3');

const fixLatinText = (text: string): string =>
  text
    // Al [dash]
    .replace(/\b(al)[\s*]*([‘'’]?[A-Z])/g, '$1-$2')
    // remove middle hyphen
    .replace(/(?![Aa]l-)([A-Z‘'’][a-z‘'’]{2,})- (?=[a-z])/g, '$1');

export {
  stringifyRegex,
  emailRegex,
  isTextMissing,
  isTextIncomplete,
  stripDiacritics,
  stripTags,
  fixSpacing,
  fixArText,
  fixLatinText,
};
