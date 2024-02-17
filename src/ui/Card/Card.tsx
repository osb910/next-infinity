import {
  HTMLAttributes,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import clsx from 'clsx';

import styles from './Card.module.css';

export type CardProps = ComponentPropsWithoutRef<'div'> & {
  children: ReactNode;
  as?: string;
};

function Card({children, as: Element = 'article', ...delegated}: CardProps) {
  return (
    // @ts-ignore
    <Element
      className={clsx(styles.wrapper, delegated.className)}
      {...delegated}
    >
      {children}
    </Element>
  );
}

export default Card;
