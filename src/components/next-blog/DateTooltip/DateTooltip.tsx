import Tooltip, {Content, Trigger} from '@/ui/Tooltip';
import {format, formatDistanceToNow} from 'date-fns';
import {ar} from 'date-fns/locale';
import cls from './DateTooltip.module.css';
import {type Locale} from '@/l10n';

export interface DateTooltipProps {
  date: string;
  locale?: Locale;
  useHijri?: boolean;
  dateOptions?: Intl.DateTimeFormatOptions;
}

const options = {year: 'numeric', month: 'long', day: 'numeric'} as const;

const DateTooltip = ({
  date,
  locale,
  useHijri,
  dateOptions = options,
}: DateTooltipProps) => {
  const pastDate = new Date(date);
  const today = new Date();
  const isAr = /^ar(-[A-Z]{2})?/.test(`${locale}`);
  const localeOption = isAr ? {locale: ar} : {};
  const formatStr = isAr ? 'do MMMM yyyy' : 'MMMM do, yyyy';
  let humanizedDate = format(pastDate, formatStr, localeOption);
  const firstRegex = /^[1\u0661]\s/;

  if (isAr) {
    humanizedDate = humanizedDate
      .replace(/\p{L}+/u, 'من $&')
      .replace(firstRegex, 'الأول ')
      .replace(/\d+/g, (d) =>
        (+d).toLocaleString('ar-EG', {useGrouping: false})
      );
    humanizedDate += ' م';
  }

  if (isAr && useHijri) {
    humanizedDate = pastDate
      .toLocaleDateString('ar-SA', dateOptions)
      .replace(/محرم/, 'المحرم')
      .replace(/(?<=[^1\u0661] )\p{L}{3,}/u, 'من $&')
      .replace(firstRegex, 'غُرَّة ');
  }

  const distanceDate = formatDistanceToNow(pastDate, {
    ...localeOption,
    addSuffix: true,
  });

  return (
    <Tooltip>
      <Trigger>
        <time dateTime={today.toISOString()}>{distanceDate}</time>
      </Trigger>
      <Content className={cls.tooltip}>{humanizedDate}</Content>
    </Tooltip>
  );
};

export default DateTooltip;
