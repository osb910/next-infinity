import classes from './EventSummary.module.css';

function EventSummary({
  title,
  isPlaceholder,
}: {
  title?: string;
  isPlaceholder?: boolean;
}) {
  return (
    <section
      style={{
        fontFamily: isPlaceholder ? 'var(--font-family-loading)' : undefined,
      }}
      className={classes.summary}
    >
      <h1>{isPlaceholder ? 'Placeholder' : title}</h1>
    </section>
  );
}

export default EventSummary;
