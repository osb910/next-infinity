export const FIVE_NOUNS = {
  ab: ['أبو', 'أبا', 'أبي'],
  dhu: ['ذو', 'ذا', 'ذي'],
  akh: ['أخو', 'أخا', 'أخي'],
  ham: ['حمو', 'حما', 'حمي'],
  fu: ['فو', 'فا', 'في'],
};

const parsingCases = {
  nominative: 0,
  accusative: 1,
  genitive: 2,
} as const;

export type ParsingCase = keyof typeof parsingCases;

export const fiveNounsRegex = {
  ab: {
    regex: '(أبو|أبا|أبي)',
    replacement: (idx: 0 | 1 | 2) => FIVE_NOUNS.ab[idx],
  },
  dhu: {
    regex: '(ذو|ذا|ذي)',
    replacement: (idx: 0 | 1 | 2) => FIVE_NOUNS.dhu[idx],
  },
  akh: {
    regex: '(أخو|أخا|أخي)',
    replacement: (idx: 0 | 1 | 2) => FIVE_NOUNS.akh[idx],
  },
  ham: {
    regex: '(حمو|حما|حمي)',
    replacement: (idx: 0 | 1 | 2) => FIVE_NOUNS.ham[idx],
  },
  fu: {
    regex: '(فو|فا|في)',
    replacement: (idx: 0 | 1 | 2) => FIVE_NOUNS.fu[idx],
  },
};

export const parseFiveNouns = (
  str: string,
  {parsing = 'nominative'}: {parsing?: ParsingCase} = {}
) => {
  let result = str;

  Object.entries(fiveNounsRegex).forEach(([, {regex, replacement}]) => {
    result = result.replace(
      RegExp(`^${regex}(\\s?\\p{L}+)`, 'u'),
      `${replacement(parsingCases[parsing])}$2`
    );
  });

  return result;
};
