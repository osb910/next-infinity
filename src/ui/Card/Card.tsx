import {type ComponentPropsWithoutRef, type ReactNode} from 'react';
import clsx from 'clsx';

import styles from './Card.module.css';

export interface CardProps extends ComponentPropsWithoutRef<'article'> {
  children: ReactNode;
}

function Card({children, ...delegated}: CardProps) {
  return (
    <article
      className={clsx(styles.wrapper, delegated.className)}
      {...delegated}
    >
      {children}
    </article>
  );
}

export default Card;
