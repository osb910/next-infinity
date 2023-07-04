import ButtonLink from '../ButtonLink/ButtonLink';
import classes from './ResultsTitle.module.css';

function ResultsTitle({date}: {date: Date}) {
  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <section className={classes.title}>
      <h1>Events in {humanReadableDate}</h1>
      <ButtonLink link='/next-events/events'>Show all events</ButtonLink>
    </section>
  );
}

export default ResultsTitle;
