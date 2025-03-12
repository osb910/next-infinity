'use client';

import useTime, {type UseTimeProps} from '@/hooks/useTime';
import {type ComponentPropsWithoutRef} from 'react';

interface LiveClockProps
  extends UseTimeProps,
    ComponentPropsWithoutRef<'section'> {
  city?: string;
  locale?: Intl.LocalesArgument;
  formatOptions?: Intl.DateTimeFormatOptions;
}

const LiveClock = ({
  city,
  locale = 'en-US',
  formatOptions,
  ...rest
}: LiveClockProps) => {
  const time = useTime(rest);
  if (!time) return null;

  const isArabic = locale?.toString()?.includes('ar');

  const date = new Intl.DateTimeFormat(locale, formatOptions).format(time);

  const shownTime = isArabic
    ? date.replace(/\d+/g, (d) => (+d).toLocaleString('ar-EG'))
    : date;

  return (
    <section {...rest}>
      {city && `${city}${isArabic ? '،' : ','} `}
      <time dateTime={time?.toISOString()}>{shownTime}</time>
    </section>
  );
};

export default LiveClock;
