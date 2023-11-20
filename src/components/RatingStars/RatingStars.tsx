'use client';

import {useId, ReactNode, ComponentProps} from 'react';
import {AiFillStar} from 'react-icons/ai';
import VisuallyHidden from '@/components/VisuallyHidden';
import {pluralize, range} from '@/utils/numbers';
import styles from './RatingStars.module.css';

export interface RatingStarsProps extends ComponentProps<'input'> {
  starsCount?: number;
  starCounter?: (star: number) => string;
  selectedRating?: number;
  className?: string;
  children?: ReactNode;
}

const RatingStars = ({
  starsCount = 5,
  starCounter = star => pluralize('star', star),
  selectedRating,
  className,
  children,
  ...delegated
}: RatingStarsProps) => {
  const stars = range(1, starsCount + 1).reverse();
  const appliedId = `rating${useId()}`;

  return (
    <div className={`${className ?? ''} ${styles.ratingStars}`}>
      {stars.map(star => (
        <>
          <input
            key={star}
            name='rating'
            defaultChecked={selectedRating === star}
            {...delegated}
            value={star}
            type='radio'
            id={`${appliedId}-${star}`}
          />
          <label htmlFor={`${appliedId}-${star}`} title={starCounter(star)}>
            <AiFillStar size={24} />
            <VisuallyHidden>{starCounter(star)}</VisuallyHidden>
          </label>
        </>
      ))}
      {children}
    </div>
  );
};

export default RatingStars;
