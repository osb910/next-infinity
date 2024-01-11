'use client';
// @ts-ignore
import {withStyles} from 'arwes';
import {ComponentProps} from 'react';

const styles = () => ({
  root: {
    margin: '0 auto',
    maxWidth: 800,
  },
  '@media (max-width: 800px)': {
    root: {
      margin: '0 12px',
    },
  },
});

interface CenteredProps extends ComponentProps<'div'> {
  classes: any;
  className: string;
  children: React.ReactNode;
}

const Centered = ({classes, className, children, ...rest}: CenteredProps) => {
  return (
    <div className={`${classes.root} ${className}`} {...rest}>
      {children}
    </div>
  );
};

export default withStyles(styles)(Centered);
