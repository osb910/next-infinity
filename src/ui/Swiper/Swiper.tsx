'use client';

import {
  Splide,
  SplideProps,
  SplideSlide,
  SplideTrack,
} from '@splidejs/react-splide';
// Default theme
import '@splidejs/react-splide/css';

// or other themes
// import '@splidejs/react-splide/css/skyblue';
import '@splidejs/react-splide/css/sea-green';

import useWindowSize from '@/hooks/useWindowSize';
import {type ComponentPropsWithoutRef, type ReactNode} from 'react';

export interface CarouselProps extends SplideProps {
  name: string;
  trackProps?: ComponentPropsWithoutRef<'div'>;
  children: ReactNode;
}

export interface SlideProps extends ComponentPropsWithoutRef<'li'> {
  children: ReactNode;
}

export const Slide = ({children, ...rest}: SlideProps) => {
  return <SplideSlide {...rest}>{children}</SplideSlide>;
};

export default function SelectBoxBundle({
  name,
  trackProps,
  children,
  ...rest
}: CarouselProps) {
  const {width: vw} = useWindowSize();
  return (
    <Splide
      hasTrack={false}
      aria-label={name}
      tag='section'
      {...rest}
      options={{
        rewind: true,
        perPage: vw <= 540 ? 1 : vw <= 1000 ? 2 : 3,
        gap: '1em',
        ...rest.options,
      }}
      // slidesPerView={
      //   vw <= 290 ? 1 : vw <= 480 ? 2 : data.length >= 4 ? 3 : data.length
      // }
      // spaceBetween='10px'
    >
      <SplideTrack {...trackProps}>{children}</SplideTrack>
    </Splide>
  );
}
