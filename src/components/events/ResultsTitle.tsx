import ButtonLink from '../ButtonLink/ButtonLink';
import classes from './ResultsTitle.module.css';

type Filters = {
  year: string;
  month: string;
  type: 'any' | 'upcoming' | 'past';
  query: string;
};
interface ResultsTitleProps {
  filters: Filters;
}

function ResultsTitle({filters}: ResultsTitleProps) {
  const {year, month, type, query} = filters;
  const readableDate =
    year === 'any'
      ? 'any time'
      : month === 'any'
      ? year
      : new Date(new Date(+year, +month - 1)).toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric',
        });
  const queryDisplay = query ? ` and "${query}"` : '';

  return (
    <section className={classes.title}>
      <h1>
        {year === 'any' ? 'All ' : ''}
        {type === 'upcoming' ? 'Upcoming ' : type === 'past' ? 'Past ' : ''}
        Events{' '}
        {year === 'any' && !query ? '' : `in ${readableDate}${queryDisplay}`}
      </h1>
      <ButtonLink link='/next-events/events'>Show all events</ButtonLink>
    </section>
  );
}

export default ResultsTitle;
