'use client';

import {useId, type ReactNode, type ComponentPropsWithoutRef} from 'react';
import {AiFillStar} from 'react-icons/ai';
import VisuallyHidden from '@/ui/VisuallyHidden';
import {pluralize, range} from '@/utils/numbers';
import cls from './RatingStars.module.css';
import clsx from 'clsx';

export interface RatingStarsProps extends ComponentPropsWithoutRef<'input'> {
  starsCount?: number;
  starCounter?: (star: number) => string;
  selectedRating?: number;
  children?: ReactNode;
}

export const RatingStars = ({
  starsCount = 5,
  starCounter = (star) => pluralize('star', star),
  selectedRating,
  children,
  ...rest
}: RatingStarsProps) => {
  const stars = range(1, starsCount + 1).reverse();
  const appliedId = `rating${useId()}`;

  return (
    <div className={clsx(cls.ratingStars, rest.className)}>
      {stars.map((star) => (
        <>
          <input
            key={`${appliedId}-${star}`}
            name='rating'
            defaultChecked={selectedRating === star}
            {...rest}
            value={star}
            type='radio'
            id={`${appliedId}-${star}`}
          />
          <label
            htmlFor={`${appliedId}-${star}`}
            title={starCounter(star)}
          >
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
