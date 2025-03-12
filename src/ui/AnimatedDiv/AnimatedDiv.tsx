'use client';

import type {ComponentPropsWithoutRef, ComponentType, ReactNode} from 'react';
import Link, {type LinkProps} from 'next/link';
import {motion, type HTMLMotionProps} from 'framer-motion';
import clsx from 'clsx';
import useIsOnscreen, {type UseIsOnscreenOptions} from '@/hooks/useIsOnscreen';

export type BaseProps = UseIsOnscreenOptions & {
  children: ReactNode;
  animationCls?: string;
  bidi?: boolean;
};

export type LinkComponentProps = BaseProps &
  ComponentPropsWithoutRef<'a'> &
  LinkProps & {
    as: typeof Link;
  };

export type MotionComponentProps<T extends keyof HTMLElementTagNameMap> =
  BaseProps &
    ComponentPropsWithoutRef<T> &
    HTMLMotionProps<T> & {
      as?: keyof HTMLElementTagNameMap | ComponentType;
    };

export type AnimatedDivProps<T extends keyof HTMLElementTagNameMap> =
  | LinkComponentProps
  | MotionComponentProps<T>;

const AnimatedDiv = <T extends keyof HTMLElementTagNameMap = 'section'>({
  children,
  animationCls,
  as: Tag = 'section',
  bidi = false,
  once,
  rootMargin,
  threshold,
  root,
  ...rest
}: AnimatedDivProps<T>) => {
  const {isVisible} = useIsOnscreen({
    selector: `#${rest.id}`,
    once: !bidi || once,
    rootMargin,
    threshold,
    root,
  });

  if (Tag === Link) {
    return (
      <Link
        {...(rest as LinkProps)}
        className={clsx(rest.className, isVisible && animationCls)}
      >
        {children}
      </Link>
    );
  }

  const MotionComponent = motion[Tag as keyof typeof motion];

  return (
    <MotionComponent
      {...(rest as HTMLMotionProps<T>)}
      {...(isVisible && {
        animate: (rest as HTMLMotionProps<T>).animate,
        initial: (rest as HTMLMotionProps<T>).initial,
      })}
      className={clsx(rest.className, isVisible && animationCls)}
    >
      {children}
    </MotionComponent>
  );
};

export default AnimatedDiv;
