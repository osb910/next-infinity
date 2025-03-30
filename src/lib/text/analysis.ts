import readingTime from 'reading-time';
import parseDistinctive from './ar/distinctive-parsing';

export const getReadingTime = (
  text: string,
  {locale}: {locale: string} = {locale: 'en-US'}
) => {
  const result = readingTime(text);
  const isAr = /ar(-[A-Z]{2})?/.test(locale);
  let min: string | number = Math.ceil(result.minutes);
  const localizedMin = Math.ceil(result.minutes).toLocaleString(
    locale === 'ar' ? `ar-EG` : locale
  );
  if (isAr) {
    const arMinutes = parseDistinctive(+min, {
      sng: 'دقيقة',
      dual: 'دقيقتان',
      plr: 'دقائق',
      parsing: 'genitive',
      keepSign: false,
    });
    result.text = `يُقرأ في ${arMinutes}`;
    min = localizedMin;
  }
  return {...result, min};
};
