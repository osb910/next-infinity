import readingTime from 'reading-time';

export const getReadingTime = (
  text: string,
  {locale}: {locale: string} = {locale: 'en-US'}
) => {
  const result = readingTime(text);
  return {...result, min: Math.ceil(result.minutes).toLocaleString(locale)};
};
