import classes from './LogisticsItem.module.css';

function LogisticsItem({
  icon: Icon,
  children,
}: {
  icon: any;
  children: React.ReactNode;
}) {
  return (
    <li className={classes.item}>
      <span className={classes.icon}>
        <Icon />
      </span>
      <span className={classes.content}>{children}</span>
    </li>
  );
}

export default LogisticsItem;
