import classes from './EventContent.module.css';

function EventContent({
  children,
  isPlaceholder,
}: {
  children: React.ReactNode;
  isPlaceholder?: boolean;
}) {
  return (
    <section
      style={{
        fontFamily: isPlaceholder ? 'var(--font-family-loading)' : undefined,
      }}
      className={classes.content}
    >
      {children}
    </section>
  );
}

export default EventContent;
