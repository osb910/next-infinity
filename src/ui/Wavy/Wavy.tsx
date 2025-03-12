'use client';

import WaterWave from 'react-water-wave';

import type {ReactNode} from 'react';

export interface WavyProps {
  children: ReactNode;
  imageUrl?: string;
  dropRadius?: number;
  perturbance?: number;
  resolution?: number;
  interactive?: boolean;
}

const Wavy = ({
  imageUrl = '',
  dropRadius = 2,
  perturbance = 0.75,
  resolution = 1024,
  interactive = true,
  children,
}: WavyProps) => {
  if (typeof window === 'undefined') return null;
  return (
    <WaterWave
      imageUrl={imageUrl}
      dropRadius={dropRadius}
      perturbance={perturbance}
      resolution={resolution}
      interactive={interactive}
    >
      {({pause, play, render, canvas}) => {
        console.log({pause, play, render, canvas});
        if (typeof window === 'undefined') return null;
        return <div style={{blockSize: '100%'}}>{children}</div>;
      }}
    </WaterWave>
  );
};

export default Wavy;
