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

export {stringifyRegex, emailRegex};
