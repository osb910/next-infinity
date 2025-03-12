import type {ElementType, ComponentPropsWithoutRef, ReactNode} from 'react';
import clsx from 'clsx';

import styles from './Card.module.css';

export type CardProps = {
  children: ReactNode;
  as?: ElementType;
} & ComponentPropsWithoutRef<'article'>;

const Card = ({children, as: Element = 'article', ...rest}: CardProps) => {
  return (
    <Element
      className={clsx(styles.wrapper, rest.className)}
      {...rest}
    >
      {children}
    </Element>
  );
};

export default Card;
