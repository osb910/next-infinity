import Tooltip, {Content, Trigger} from '@/ui/Tooltip';
import {getRelativeDate} from '@/utils/general';
import cls from './DateTooltip.module.css';
// import {useState} from 'react';

interface DateTooltipProps {
  date: string;
}

const DateTooltip = ({date}: DateTooltipProps) => {
  // const [isOpen, setIsOpen] = useState(false);
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  // const humanizedDate = format(new Date(publishedOn), 'MMMM do, yyyy');

  const relativeDate = getRelativeDate(date);
  return (
    <Tooltip>
      <Trigger>
        <time dateTime={new Date(date).toISOString()}>{relativeDate}</time>
      </Trigger>
      <Content className={cls.tooltip}>{formattedDate}</Content>
    </Tooltip>
  );
};

export default DateTooltip;
